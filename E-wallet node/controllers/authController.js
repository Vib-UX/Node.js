import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import dotenv from 'dotenv';
import sendTokens from './sendTokens';
import User from '../model/userModel';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import Email from '../utils/email';

dotenv.config({ path: '../config.env' });

//get the JWT token
const getToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET_TOKEN, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

export const signup = catchAsync(async (req, res, next) => {
  const newUserData = { ...req.body };
  //if user is not ceated by admins then exclude this fields
  //as a normal user can manipulate this data
  const excludedFields = ['role', 'accountBalance', 'createdAt'];

  //if this is regular signup then exclude the above fields
  //or if user is created by admin then bypass it
  //this is comming from createUser middleware in userRoute

  if (!req.createUserByAdmin) {
    excludedFields.forEach((el) => delete newUserData[el]);
  }

  let user;
  try {
    const tx = await sendTokens(null,newUserData.address, '100');
    newUserData['TransactionHash'] = tx.hash;
    // newUserData["Account"] = 
    console.log(newUserData);
    user = await User.create(newUserData);
  } catch (err) {
    next(err);
  }

  //create the JWT token based on new user id
  const token = getToken(user._id);

  //send the sign up mail
  await new Email(user).sendWelcome();
  //send responce
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) check email and password is present
  if (!email || !password) {
    return next(new AppError(401, 'provide email and password'));
  }

  // 2) check user exist and passord is correct
  //as we mentioned select false in password we need call for it explicitly else it will not return the password filed
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError(401, 'provide correct email and password'));
  }

  //get the token
  const token = getToken(user._id);
  //send the responce
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});

export const logout = (req, res, next) => {
  //we are not sending the token
  //so user will be automatically unauthorized
  res.status(200).json({
    status: 'success',
  });
};

export const protect = catchAsync(async (req, res, next) => {
  //get the token from req headers filed
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  //if token not exist
  if (!token) {
    return next(
      new AppError(401, 'You are not logged in .please login to get access')
    );
  }

  //get the payload data(id) which we have provided during token creation
  //token expiration error comes from here
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_TOKEN
  );

  //get the current user
  const currentUser = await User.findById(decoded.id);

  //if user not exist
  if (!currentUser) {
    return next(
      new AppError(401, 'The token belong to the user does not exist')
    );
  }
  //if we come up to this point .it means user is logged in correctly
  //so we are adding the the user in req so that next middleware can use it
  req.user = currentUser;
  console.log(currentUser);
  next();
});

//restrict users based on their roles
//if user role is not roles then return error
export const restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError(403, 'You are not authorized to do that'));
    }
    next();
  };
