import express from 'express';
const router = express.Router();

import { users, registerUsers, deregisterUser, userDashboard, leaderBoard} from '../ctrl/users.js'

router.get('/',
    //auth
    users
).post('/',
    registerUsers
)

router.delete('/:userId', 
    deregisterUser
)

router.get('/:userId/dashboard', 
    userDashboard
)

router.get('/leaderboard',
    leaderBoard
)


export default router;