import { query } from '../db.js';

export const courses = async(req, res, next) => {
    try {
        const result = (await query(`SELECT * FROM COURSES`)).rows;
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
                                VALUES ('${title}', '${description}', '${category}')
                                RETURNING *
                                `)).rows;
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
        const checkData = (await query(`SELECT * FROM COURSES WHERE id = '${id}'`)).rows;

        if(checkData.length == 0) {
            res.status(404).json({message: "Id not found in DB"});

        } else {

        const result = (await query(`DELETE FROM COURSES WHERE id = '${id}'
                        RETURNING *
                        `)).rows;
        res.status(200).json({message: "file deleted success", data: result});
        
        }
    } catch (error) {
        const errMsg = error.message.length > 100 ? error.message.slice(0, 100) : error.message;
        console.error("error fetching courses: " , errMsg);
        res.status(500).json({error: true, message: error.message})
    }
}