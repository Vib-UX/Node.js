import express from 'express';
import { signup,login,logout,protect,restrictTo } from '../controllers/authController';
import { getAllUsers,getUser,createUser } from '../controllers/userController';
// const userController = require('../controllers/userController');

const userRouter = express.Router();

//---------------Authentication Part------------------------
userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
//---------------------------------------------------------

//All below routes needs user to be logged in
userRouter.use(protect);

//only admin can access this routes
userRouter.use(restrictTo('admin'));

userRouter
  .route('/')
  .get(getAllUsers)
  .post(createUser, signup);

userRouter.get('/:id', getUser);

export default userRouter;
