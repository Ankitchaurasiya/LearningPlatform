import express from 'express';
import bodyParser from 'body-parser';
import requestIp from 'request-ip';
//import helmet from 'helmet';

import userRouter from './routers/users.js';
import courseRouter from './routers/courses.js'
import {logger} from './middlewares/logger.js';


const app = express();
app.use(bodyParser.json());
app.use(requestIp.mw());
app.use(logger);

app.get('/', (req, res)=>{
   res.send({message: "server up"});
})

app.use('/users', userRouter);
app.use('/courses', courseRouter);
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})