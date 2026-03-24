import asyncHandler from "express-async-handler";
import env from "../../../config/env.js";
import AuthService from "../../services/v1/auth.service.js";

// Utils
const setCookie = (res, token) => {
  res.cookie("x-access-token", token, {
    httpOnly: true,
    secure: env.core.node_env === "production",
    maxAge: 1000 * 60 * 15,
    sameSite: "lax",
  });
};

const clearCookie = (res, name) => {
  res.clearCookie(name, {
    httpOnly: true,
    secure: env.core.node_env === "production",
    sameSite: "lax",
  });
};

class AuthController {
  // @desc    Register a user
  // @route   POST /v1/auth/register
  // @access  Public
  static register = asyncHandler(async (req, res) => {
    const input = req.body;

    const { message, token, data } = await AuthService.register(input);

    setCookie(res, token);

    res.status(201).json({ success: true, message, data });
  });

  // @desc    Login a user
  // @route   POST /v1/auth/login
  // @access  Public
  static login = asyncHandler(async (req, res) => {
    const input = req.body;

    const { message, token, data } = await AuthService.login(input);

    setCookie(res, token);

    res.status(200).json({ success: true, message, data });
  });

  // @desc    Logout a user
  // @route   POST /v1/auth/logout
  // @access  Public
  static logout = asyncHandler(async (req, res) => {
    const { message } = await AuthService.logout();

    clearCookie(res, "x-access-token");

    res.status(200).json({ success: true, message });
  });
}

export default AuthController;
