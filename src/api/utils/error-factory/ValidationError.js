import ApiError from "./ApiError.js";

class ValidationError extends ApiError {
  constructor(message, details, statusCode = 400) {
    super(message, statusCode);
    this.details = details;
  }
}

export default ValidationError;
