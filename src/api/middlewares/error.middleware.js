import ApiError from "../utils/error-factory/ApiError.js";
import env from "../../config/env.js";
import logger from "../utils/logger.js";

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  if (!(err instanceof ApiError)) {
    err = new ApiError(
      err.message || "Internal server error",
      err.statusCode || 500,
    );
    err.stack = err.stack || new Error().stack;
  }

  const errorResponse = {
    success: false,
    name: err.name,
    message: err.message,
    operational: err.operational,
    ...(err.path && { path: err.path }),
    ...(err.details && { details: err.details }),
    ...(env.core.node_env === "development" && { stack: err.stack }),
  };

  logger.error(errorResponse);

  res.status(err.statusCode).json(errorResponse);
};

export default errorHandler;
