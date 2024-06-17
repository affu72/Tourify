import express from 'express';
import morgan from 'morgan';
import tourRouter from './routes/tourRoutes.js';
import  userRouter from './routes/userRoutes.js';

import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const app = express();

//1) MIDDLEWARES
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} 

app.use(express.json());

app.use(express.static('./public'))

//Mounting the routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;

