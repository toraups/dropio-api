import NotFoundError from "../utils/error-factory/NotFoundError.js";

const notFoundHandler = (req, res, next) => {
  next(new NotFoundError("Request route not matched", req.originalUrl));
};

export default notFoundHandler;
