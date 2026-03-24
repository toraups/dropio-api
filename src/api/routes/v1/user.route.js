import express from "express";
import UserController from "../../controllers/v1/user.controller.js";

const router = express.Router();

// Routes
router.get("/me", UserController.getMe);
router.patch("/me", UserController.updateMe);
router.patch("/me/password", UserController.updatePassword);
router.delete("/me", UserController.deleteUser);

export default router;
