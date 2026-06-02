import express from 'express';
const router = express.Router();

import { validateBody, validateQuery, validateParams } from '../middlewares/validationMiddleware.js';
import {usersValidation} from '../validation/users.js';
import { users, registerUsers, deregisterUser, userDashboard, leaderBoard} from '../ctrl/users.js'

router.get('/',
    //auth
    validateQuery(usersValidation),
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