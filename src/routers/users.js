import express from 'express';
const router = express.Router();

import { users, registerUsers, deregisterUser} from '../ctrl/users.js'
console.log("user routers");

router.get('/',
    //auth
    users
).post('/',
    registerUsers
)

router.delete('/:userId', 
    deregisterUser
)


export default router;