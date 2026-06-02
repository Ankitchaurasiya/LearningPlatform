import jwt from 'jsonwebtoken';

const SECRETKEY = 'Ankit1234';

export const generateToken = async (user) => {
    return jwt.sign({
        user_id : user.id,
        username: user.username,
        email_id : user.email_id
    }, SECRETKEY, {
        expiresIn : "5m"
    });
}

export const authenticate = async (req, res, next) => {
    try {
        // call the header,  split header
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return res.status(401).json({message: "Authorization header missing"});
        }
        const token = authHeader.split(' ')[1];
        if(!token){
            return res.status(401).json({message: "Token missing"});
        }
        //console.log(token);
        // decoded: jwt.verify(token secretkey)
        const decoded = await jwt.verify(token, SECRETKEY);
        //console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        const errMsg = error.message.length > 100 ? error.message.slice(0, 100) : error.message;
        console.error("error authenticate User: " , errMsg);
        res.status(500).json({error: true, message: error.message})
    }

}