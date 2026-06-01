import express from 'express';
const router = express.Router();

 import {courses, registerCourses, DeregisterCourses} from "../ctrl/courses.js";

router.get('/', 
    courses
)
.post('/', 
    registerCourses
)

router.delete('/:courseId',
    DeregisterCourses
)

export default router;