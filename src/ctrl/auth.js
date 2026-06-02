import { query } from '../db.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../middlewares/authMiddleware.js';


export const register = async (req, res, next) => {
    try {
        let {name, email, username, password } = req.body;   
        password = password.trim();
        //checkk existing user
        const existingUser = (await query(`
                                SELECT Id, name, email_id FROM users
                                WHERE name = $1 or email_id = $2
                            `, [name, email])).rows;
        if(existingUser.length > 0) {
            return res.status(409).json({message: `user already there: ${email}`});
        }
        
        const userResult = (await query(`
                                INSERT INTO users (name, email_id, username)
                                VALUES ($1, $2, $3)
                                RETURNING *
                            `, [name, email, username])).rows;

        console.log('user registered');
        // gen salt and hash password       
        const salt = await bcrypt.genSalt(10);                     
        const passwordHashed = await bcrypt.hash(password, salt);

        const credsResult = (await query(`
                                INSERT INTO user_creds (user_id, password_hashed)
                                values ($1, $2)
                            `, [userResult[0].id, passwordHashed])).rows;
        
        console.log('password stored success');
        res.status(201).json({message: "User registered Successfully"});

    } catch (error) {
        const errMsg = error.message.length > 100 ? error.message.slice(0, 100) : error.message;
        console.error("error registering User: " , errMsg);
        res.status(500).json({error: true, message: error.message})
    }
};

export const login = async (req, res, next) => {
    try {
        let { email, password } = req.body;
        password = password.trim();

        console.log(email);
        const userResult = (await query(`
                                SELECT * FROM users 
                                WHERE email_id = $1
                            `, [email])).rows;

        if(userResult.length === 0) {
            return res.status(404).json({message: "User not found, register yourself"});
        }
        // fetch the Db stored password and compare it
        const storedUserResult = (await query(`
                                    SELECT u.id, u.name, u.email_id, u.username,
                                    uc.password_hashed
                                    FROM users u
                                    JOIN user_creds uc 
                                    ON uc.user_id = u.id
                                    WHERE u.email_id = $1
                                    `, [email])).rows;

        
        //console.log(storedUserResult);

        const isValidPassword = await bcrypt.compare(password, storedUserResult[0].password_hashed);
        if(!isValidPassword){
            return res.status(401).json({message: "UnAuthorized"});
        }
        // if password valid then gen token
        const token = await generateToken(storedUserResult[0]);

        res.status(200).json({message: "login Success", /* data: userResult, */ token});

    } catch (error) {
        const errMsg = error.message.length > 100 ? error.message.slice(0, 100) : error.message;
        console.error("error login User: " , errMsg);
        res.status(500).json({error: true, message: error.message})
    }
}