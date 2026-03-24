import asyncHandler from "express-async-handler";
import UserService from "../../services/v1/user.service.js";

class UserController {
  // @desc    Get user profile
  // @route   GET /v1/users/me
  // @access  Private
  static getMe = asyncHandler(async (req, res) => {
    res.status(200).json({
      success: true,
      message: "User profile retrieved",
      data: req.user,
    });
  });

  // @desc    Update user profile
  // @route   PATCH /v1/users/me
  // @access  Private
  static updateMe = asyncHandler(async (req, res) => {
    const id = req.user.id;
    const input = req.body;

    const { message, data } = await UserService.updateMe(id, input);

    res.status(200).json({ success: true, message, data });
  });

  // @desc    Update user password
  // @route   PATCH /v1/users/me/password
  // @access  Private
  static updatePassword = asyncHandler(async (req, res) => {
    const id = req.user.id;
    const input = req.body;

    const { message, data } = await UserService.updatePassword(id, input);

    res.status(200).json({ success: true, message, data });
  });

  // @desc    Delete user profile
  // @route   DELETE /v1/users/me
  // @access  Private
  static deleteMe = asyncHandler(async (req, res) => {
    const id = req.user.id;

    const { message } = await UserService.deleteMe(id);

    res.status(200).json({ success: true, message });
  });
}

export default UserController;
