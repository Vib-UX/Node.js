import express from 'express';
import globalErrorHandler from './controllers/globalErrorHandler';
import userRouter from './routes/userRoutes';
import txRouter from './routes/txRoutes'
const app = express();

//body perser
app.use(express.json());

//handles all the user related endpoints
app.use('/api/v1/users',userRouter)

//handles all the endpoints related to transaction
app.use('/api/v1/transactions',txRouter)



//Error handling middleware
//4 areguments -> express will autmetically recognize it as a error handling middleware
//and only call it when there is a error
app.use(globalErrorHandler)

export default app;
