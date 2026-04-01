import asyncHandler from "express-async-handler";
import env from "../../../config/env.js";
import AuthService from "../../services/v1/auth.service.js";

// Utils
const setCookie = (res, token) => {
  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: env.core.node_env === "production",
    maxAge: 1000 * 60 * 15, // 15 mins
    sameSite: "lax",
  });
};

const clearCookie = (res) => {
  res.clearCookie("accessToken", {
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

    clearCookie(res);

    res.status(200).json({ success: true, message });
  });

  // @desc    Verify email
  // @route   GET /v1/auth/verify
  // @access  Public
  static verifyEmail = asyncHandler(async (req, res) => {
    const token = req.query.token;

    console.log(token);

    const { message } = await AuthService.verifyEmail(token);

    res.status(200).json({ success: true, message });
  });

  // @desc    Resend email verification link
  // @route   POST /v1/auth/resend-email
  // @access  Public
  static resendEmail = asyncHandler(async (req, res) => {
    const input = req.body;

    const { message } = await AuthService.resendVerificationEmail(input);

    res.status(200).json({ success: true, message });
  });

  // @desc    Forgot password
  // @route   POST /v1/auth/forgot-password
  // @access  Public
  static forgotPassword = asyncHandler(async (req, res) => {
    const input = req.body;

    const { message } = await AuthService.forgotPassword(input);

    res.status(200).json({ success: true, message });
  });

  // @desc    Reset password
  // @route   POST /v1/auth/reset-password
  // @access  Public
  static resetPassword = asyncHandler(async (req, res) => {
    const token = req.query.token;
    const input = req.body;

    const { message } = await AuthService.resetPassword(token, input);

    res.status(200).json({ message });
  });
}

export default AuthController;
