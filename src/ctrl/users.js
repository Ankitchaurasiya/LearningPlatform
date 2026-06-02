import { query } from '../db.js';

export const users = async (req, res, next) => {
    try {
        let where = [];
        let params = [];
        let skip = Number(req.query.skip) || 0;
        let limit = Number(req.query.limit) || 10;

        if(req.query.name){
            params.push(req.query.name);
            where.push(`name = $${params.length}`);
        }
        if(req.query.id){
            params.push(req.query.id);
            where.push(`id = $${params.length}`);
        }
        
        params.push(limit);
        const limitParam = `$${params.length}`;

        params.push(offset);
        const offsetParam = `$${params.length}`;

        const sql_query = `SELECT * 
                            FROM USERS
                            ${where.length> 0 ? `where ${where.join(" AND ")}` : ''}
                            LIMIT ${limitParam} OFFSET ${offsetParam};
                            `;
        const result = (await query(sql_query, params)).rows;
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
                    VALUES ($1, $2, $3)
                    RETURNING *
            `, [name, email, username])).rows;

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

        const result = (await query(`DELETE FROM USERS WHERE id = $1
                        RETURNING *
                        `, [id])).rows;

        if(result.length === 0){
            return  res.status(404).json({message: "user not found in DB"});
        }
        res.status(200).json({message: "file deleted success", data: result});

    } catch (error) {
        const errMsg = error.message.length > 100 ? error.message.slice(0, 100) : error.message;
        console.error("error fetching courses: " , errMsg);
        res.status(500).json({error: true, message: error.message})
    }
}

export const userDashboard = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const result = (await query(`
                        select 
                        u.id,
                        u.name, u.email_id, u.username, 
                        count(e.id) as enrolled_courses, 
                        sum(case when e.progress = 100 then 1 else 0 end ) as completed_courses,
                        COALESCE (round(AVG(e.progress), 2), 0) as average_progress
                        from users u
                        left join enrollments e 
                        on e.user_id = u.id 
                        where u.id = $1
                        group by u.id, u.email_id, u.name, u.username;
                    `, [userId])).rows;

        if(result.length === 0){
            return  res.status(404).json({message: "not found in DB"});
        }
        res.status(200).json({message: "Success", data: result});
    } catch (error) {

        const errMsg = error.message.length > 100 ? error.message.slice(0, 100) : error.message;
        console.error("error in users dashboard query: ", errMsg);
        res.status(500).json({error: true, message: error.message});
    }
}

export const leaderBoard = async (req, res, next) => {
    try {
        const result = (await query(`
                            select  u.name, u.email_id, u.username, 
                            count(e.id) as enrolled_courses, 
                            sum(case when e.progress = 100 then 1 else 0 end ) as completed_courses,
                            coalesce( round(AVG(e.progress), 2), 0) as average_progress
                            from users u
                            left join enrollments e 
                            on e.user_id = u.id
                            group by u.id, u.email_id, u.name, u.username
                            order by completed_courses desc, average_progress DESC;
                        `)).rows;
        
        res.status(200).json({message: "Success", data: result});
    } catch (error) {
        const errMsg = error.message.length > 100 ? error.message.slice(0, 100) : error.message;
        console.error("error in users dashboard query: ", errMsg);
        res.status(500).json({error: true, message: error.message});
    }
}