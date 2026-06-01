import express from 'express';
const router = express.Router();

import { enrollments, registerEnrollments, enrollmentsProgress} from '../ctrl/enrollment.js'

router.get('/',
    enrollments
).post('/',
    registerEnrollments
)

router.patch('/:enrollmentId/progress', 
    enrollmentsProgress
)


export default router;