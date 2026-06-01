import { query } from '../db.js';

export const users = async (req, res, next) => {

    try {
        const result = (await query(`SELECT * FROM USERS`)).rows;
        res.status(200).json({message: "Success", data: result});
        
    } catch (error) {
        const errMsg = error.message.length > 100 ? error.message.slice(0, 100) : error.message;
        console.error("error in users get query: ", errMsg);
        res.status(500).json({error: true, message: error.message});
    }
}

export const registerUsers = async (req, res, next) => {
    try {
        const { name, email, username } = req.body;
        const result = (await query(`
                    INSERT INTO USERS (name, email_id, username)
                    VALUES ('${name}', '${email}', '${username}')
                    RETURNING *
            `)).rows;

        res.status(200).json({message: "Success", data: result});
    } catch (error) {
        const errMsg = error.message.length > 100 ? error.message.slice(0, 100) : error.message;
        console.error("error in users register query: ", errMsg);
        res.status(500).json({error: true, message: error.message});
    }
}


export const deregisterUser = async (req, res, next) => {
    try {
        const id = req.params.userId;
        const checkData = (await query(`SELECT * FROM USERS WHERE id = '${id}'`)).rows;

        if(checkData.length == 0) {
            res.status(404).json({message: "Id not found in DB"});

        } else {

        const result = (await query(`DELETE FROM USERS WHERE id = '${id}'
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