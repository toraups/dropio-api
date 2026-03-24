import morgan from "morgan";
import logger from "../utils/logger.js";

const httpLogger = () =>
  morgan((token, req, res) => {
    const logData = {
      method: token.method(req, res),
      url: req.originalUrl,
      status: Number(token.status(req, res)),
      ip: token["remote-addr"](req, res),
      responseTime: Number(token["response-time"](req, res)),
      contentLength: Number(token.res(req, res, "content-length") || 0),
    };

    logger.http(logData);
  });

export default httpLogger;
