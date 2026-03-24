import express from "express";
import rootRouter from "./core/root.route.js";
import authRouter from "./v1/auth.route.js";

const router = express.Router();

// Routes
router.use("/", rootRouter);
router.use("/v1/auth", authRouter);

export default router;
