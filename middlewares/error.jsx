export const errorHandler = (
  res,
  statusCode = 500,
  message = "Internal Server Error"
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
export const asyncError = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};