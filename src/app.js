import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmetOptions from "./config/helmet.js";
import requestId from "./api/middlewares/request.middleware.js";
import httpLogger from "./api/middlewares/http.middleware.js";
import rateLimiter from "./api/middlewares/limit.middleware.js";
import notFoundHandler from "./api/middlewares/notfound.middleware.js";
import errorHandler from "./api/middlewares/error.middleware.js";
import router from "./api/routes/index.js";

const app = express();

app.set("trust proxy", 1);

// Global middlewares
app.use(cors());
app.use(helmet(helmetOptions));
app.use(requestId());
app.use(httpLogger());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(rateLimiter("global"));
app.use(compression());

// Routes
app.use("/", router);

// Central middlewares
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
