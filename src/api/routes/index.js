import express from "express";
import rootRouter from "./core/root.route.js";
import authRouter from "./v1/auth.route.js";
import userRouter from "./v1/user.route.js";

const router = express.Router();

// Routes
router.use("/", rootRouter);
router.use("/v1/auth", authRouter);
router.use("/v1/users", userRouter);

export default router;
