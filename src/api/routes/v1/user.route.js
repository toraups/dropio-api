import express from "express";
import UserController from "../../controllers/v1/user.controller.js";
import protect from "../../middlewares/auth.middleware.js";

const router = express.Router();

// Routes
router.get("/", UserController.getUsers);

router.use(protect);
router.get("/me", UserController.getMe);
router.patch("/me", UserController.updateMe);
router.patch("/me/password", UserController.updatePassword);
router.delete("/me", UserController.deleteMe);

export default router;
