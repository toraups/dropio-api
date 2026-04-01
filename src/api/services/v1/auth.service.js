import User from "../../models/user.model.js";
import ValidationError from "../../utils/error-factory/ValidationError.js";
import AuthenticationError from "../../utils/error-factory/AuthenticationError.js";
import NotFoundError from "../../utils/error-factory/NotFoundError.js";
import Jwt from "../../utils/Jwt.js";
import Token from "../../utils/Token.js";
import MailService from "../others/mail.service.js";
import EmailTemplates from "../../utils/Templates.js";
import env from "../../../config/env.js";

// Utils
const checkUser = (user) => {
  if (!user) {
    throw new NotFoundError("User not found");
  }
};

const checkUserStatus = (user) => {
  if (!user.isVerified) {
    throw new ValidationError("Email is not verified");
  }
};

class AuthService {
  // REGISTER SERVICE
  static register = async (input) => {
    const { name, email, password } = input;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ValidationError("Email already registered");
    }

    // Generate verification token
    const rawToken = Token.generateToken();
    const hashedToken = Token.hashToken(rawToken);

    // Create user (single DB write)
    const newUser = await User.create({
      name,
      email,
      password,
      verificationToken: hashedToken,
      verificationExpires: new Date(Date.now() + 1000 * 60 * 60),
    });

    // Auth token
    const token = Jwt.signToken({ id: newUser._id.toString() });

    // Verification URL (FULL URL)
    const verificationUrl = `${env.core.client_url}/v1/auth/verify?token=${rawToken}`;

    // Email template
    const html = EmailTemplates.verifyEmail(newUser.name, verificationUrl);

    // Send email
    await MailService.sendMail({
      to: newUser.email,
      subject: "Verify your email",
      html,
      text: `Verify your email: ${verificationUrl}`,
    });

    return {
      message: "User registered",
      token,
      data: newUser.toObject(),
    };
  };

  // LOGIN SERVICE
  static login = async (input) => {
    const { email, password } = input;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.verifyPassword(password))) {
      throw new AuthenticationError("Invalid credentials");
    }

    checkUserStatus(user);

    const token = Jwt.signToken({ id: user._id.toString() });

    return {
      message: "User logged in",
      token,
      data: user.toObject(),
    };
  };

  // LOGOUT SERVICE
  static logout = async () => {
    return { message: "User logged out" };
  };

  // VERIFY EMAIL SERVICE
  static verifyEmail = async (token) => {
    const user = await User.findOne({
      verificationToken: Token.hashToken(token),
      verificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new ValidationError("Invalid or expired token");
    }

    if (user.isVerified) {
      throw new ValidationError("Email is already verified");
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationExpires = null;

    await user.save();

    return { message: "User verified" };
  };

  // RESEND VERIFICATION EMAIL SERVICE
  static resendVerificationEmail = async (input) => {
    const { email } = input;

    const user = await User.findOne({ email });

    checkUser(user);

    if (user.isVerified) {
      throw new ValidationError("Email is already verified");
    }

    if (!user.verificationToken || user.verificationExpires < Date.now()) {
      // Generate new token and expiry
      const rawToken = Token.generateToken();
      const hashedToken = Token.hashToken(rawToken);
      user.verificationToken = hashedToken;
      user.verificationExpires = new Date(Date.now() + 1000 * 60 * 60);
      await user.save();

      // Resend verification email
      const verificationUrl = `${env.core.client_url}/verify?token=${rawToken}`;
      const html = EmailTemplates.verifyEmail(user.name, verificationUrl);
      await MailService.sendMail({
        to: user.email,
        subject: "Verify your email",
        html,
        text: `Verify your email: ${verificationUrl}`,
      });

      return { message: "Verification email resent" };
    } else {
      throw new ValidationError(
        "Verification token is still valid, please check your inbox.",
      );
    }
  };

  // FORGOT PASSWORD SERVICE
  static forgotPassword = async (input) => {
    const { email } = input;

    const user = await User.findOne({ email });

    checkUser(user);

    // Generate password reset token and expiry
    const rawToken = Token.generateToken();
    const hashedToken = Token.hashToken(rawToken);

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpiry = new Date(Date.now() + 1000 * 60 * 30);
    await user.save();

    const resetPasswordUrl = `${env.core.client_url}/reset?token=${rawToken}`;

    // Create email
    const html = EmailTemplates.forgotPassword(user.name, resetPasswordUrl);

    // Send email
    await MailService.sendMail({
      to: user.email,
      subject: "Reset your password",
      html,
    });

    return { message: "Reset password email sent" };
  };

  // RESET PASSWORD SERVICE
  static resetPassword = async (token, input) => {
    const { newPassword } = input;

    const user = await User.findOne({
      resetPasswordToken: Token.hashToken(token),
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      throw new ValidationError("Invalid or expired token");
    }

    checkUserStatus(user);

    user.password = newPassword;
    await user.save();

    const html = EmailTemplates.resetPassword(user.name);

    await MailService.sendMail({
      to: user.email,
      subject: "Password reset",
      html,
    });

    return { message: "User password reset" };
  };
}

export default AuthService;
