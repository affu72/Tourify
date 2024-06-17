import express from 'express';
import morgan from 'morgan';
import tourRouter from './routes/tourRoutes.js';
import  userRouter from './routes/userRoutes.js';


const app = express();

//1) MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Middleware');
  next();
});

//Mounting the routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

export default app;
