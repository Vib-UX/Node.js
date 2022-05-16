import User from "../model/userModel";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync"

export const getAllUsers = catchAsync(async (req, res, next) => {
  //get all users from DB
  const users = await User.find();
  //send responce
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});


export const getUser = catchAsync(async(req,res,next)=>{
  //get a user based on their id
  const user = await User.findById(req.params.id);
  //if user is not present returned error
  if(!user){
    return next(new AppError(404,'No data found'))
  }
  //send responce
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  })
})

//this is used as a middleware after that it will go to signup (see user route)
//this middleware is hit when admins create user
export const createUser = (req, res,next) => {
  req.createUserByAdmin=true;
  next()
};

