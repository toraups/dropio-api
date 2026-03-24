import asyncHandler from "express-async-handler";

class UserController {
  // @desc    Get user profile
  // @route   GET /v1/users/me
  // @access  Private
  static getMe = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Authenticated user's profile" });
  });

  // @desc    Update user profile
  // @route   PATCH /v1/users/me
  // @access  Private
  static updateMe = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Update user's profile" });
  });

  // @desc    Update user password
  // @route   PATCH /v1/users/me/password
  // @access  Private
  static updatePassword = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Update user's password" });
  });

  // @desc    Delete user profile
  // @route   DELETE /v1/users/me
  // @access  Private
  static deleteUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Delete user's profile" });
  });
}

export default UserController;
