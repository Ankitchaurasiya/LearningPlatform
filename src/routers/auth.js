import express from 'express';

const router = express.Router();
import {authenticate} from '../middlewares/authMiddleware.js'
import { register, login } from "../ctrl/auth.js";
//register
//login

router.post('/register', register);
router.post('/login', login);

router.get('/testAuth', authenticate , (req, res, next) => {
    res.send({
       message: "Authenticated", "token_expire_in": req.user.exp
    });
});

export default router;