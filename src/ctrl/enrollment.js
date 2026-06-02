import { query } from '../db.js';

export const enrollments = async (req, res, next) => {

    try {
        const result = (await query(`SELECT * FROM ENROLLMENTS`)).rows;
        res.status(200).json({message: "Success", data: result});
        
    } catch (error) {
        const errMsg = error.message.length > 100 ? error.message.slice(0, 100) : error.message;
        console.error("error in enrollments get query: ", errMsg);
        res.status(500).json({error: true, message: error.message});
    }
}

export const registerEnrollments = async (req, res, next) => {
    try {
        const { userId, courseId } = req.body;
        const result = (await query(`
                    INSERT INTO ENROLLMENTS (user_id, course_id)
                    VALUES ($1, $2)
                    RETURNING *
            `, [userId, courseId])).rows;

        res.status(201).json({message: "Success", data: result});
    } catch (error) {
        const errMsg = error.message.length > 100 ? error.message.slice(0, 100) : error.message;
        console.error("error in enrollments register query: ", errMsg);
        res.status(500).json({error: true, message: error.message});
    }
}

export const enrollmentsProgress = async (req, res, next) => {
    
    try {
    const id = req.params.enrollmentId;
    const { progress } = req.body;
    const result = (await query(` 
                        UPDATE enrollments
                        SET progress = $1
                        where id = $2
                        RETURNING *    
            `, [progress, id])).rows;
    
    res.status(200).json({message: "enrollments updated with progress", data: result});

    } catch (error) {
        const errMsg = error.message.length > 100 ? error.message.slice(0, 100) : error.message;
        console.error("error in enrollments register query: ", errMsg);
        res.status(500).json({error: true, message: error.message});   
    }
}