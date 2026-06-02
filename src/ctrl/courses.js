import { query } from '../db.js';

export const courses = async(req, res, next) => {
    try {
        let where = [];
        let params = [];

        if(req.query.category) {
            params.push(req.query.category);
            where.push(`category = $${params.length}`);
        }
        if(req.query.title) {
            params.push(req.query.title);
            where.push(`title = $${params.length}`);
        }

        const sql_query = `SELECT * 
                            FROM COURSES 
                            ${where.length > 0 ? `where ${where.join(" AND ")}` : ''}
                            `

        const result = (await query(sql_query, params)).rows;


        res.status(200).json({message: "success", data: result});

    } catch (error) {
        const errMsg = error.message.length > 100 ? error.message.slice(0, 100) : error.message;
        console.error("error fetching courses: " , errMsg);
        res.status(500).json({error: true, message: error.message})
    }
}

export const registerCourses = async (req, res, next) => {
    try {
        const {title, description, category} = req.body;
        const result = ( await query(`INSERT INTO COURSES (title, description, category) 
                                VALUES ( $1, $2, $3)
                                RETURNING *
                                `, [title, description, category])).rows;
        res.status(201).json({message : "Success", data: result});

    } catch (error) {
        const errMsg = error.message.length > 100 ? error.message.slice(0, 100) : error.message;
        console.error("error registering courses : " , errMsg);
        res.status(500).json({error: true, message: error.message})
    }
}

export const DeregisterCourses = async (req, res, next) => {
    try {
        const id = req.params.courseId;

        const result = (await query(`DELETE FROM COURSES WHERE id = $1
                        RETURNING *
                        `, [id])).rows;
        if(result.length == 0) {
            res.status(404).json({message: "course not found in DB"});   
        }
        res.status(200).json({message: "file deleted success", data: result});
        

    } catch (error) {
        const errMsg = error.message.length > 100 ? error.message.slice(0, 100) : error.message;
        console.error("error fetching courses: " , errMsg);
        res.status(500).json({error: true, message: error.message})
    }
}