class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
export const errorMiddleware = (err, req, res, next) => {
  let error = err;

  if (!(err instanceof ErrorHandler)) {
    // If the error is not an instance of ErrorHandler, create a new instance
    error = new ErrorHandler(
      err.message || "Internal Server Error",
      err.statusCode || 500
    );
  }

  if (error.name === "CastError") {
    error.message = `Resource not found. Invalid ${err.path}`;
    error.statusCode = 400;
  }
  if (error.code === 11000) {
    error.message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    error.statusCode = 400;
  }
  if (error.name === "JsonWebTokenError") {
    error.message = "Json Web Token is invalid, Try again!";
    error.statusCode = 401; // Unauthorized
  }
  if (error.name === "TokenExpiredError") {
    error.message = "Json Web Token is expired, Try again!";
    error.statusCode = 401; // Unauthorized
  }

  return res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};

export default ErrorHandler;
