import { v4 } from "uuid";
import Context from "../utils/Context.js";

const requestId = () => (req, res, next) => {
  const generatedId = v4().slice(0, 8);
  const requestId = req.headers["x-request-id"] || generatedId;

  req.requestId = requestId;
  res.setHeader("x-request-id", requestId);

  Context.setContext({ requestId }, () => {
    next();
  });
};

export default requestId;
