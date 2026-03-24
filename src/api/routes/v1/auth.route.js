import express from "express";
import validate from "../../middlewares/validation.middleware.js";
import AuthController from "../../controllers/v1/auth.controller.js";
import AuthValidator from "../../validators/AuthValidator.js";

const router = express.Router();

// Routes
router.post(
  "/register",
  validate(AuthValidator.register),
  AuthController.register,
);
router.post("/login", validate(AuthValidator.login), AuthController.login);
router.post("/logout", AuthController.logout);

export default router;
