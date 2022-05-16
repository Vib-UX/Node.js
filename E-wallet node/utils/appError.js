class AppError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

    //to get the error stack on the class
    //current obj,the AppError class itself
    Error.captureStackTrace(this, this.constructor);
  }
}

 export default AppError;
