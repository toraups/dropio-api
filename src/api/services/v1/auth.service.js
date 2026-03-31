import User from "../../models/user.model.js";
import ValidationError from "../../utils/error-factory/ValidationError.js";
import AuthenticationError from "../../utils/error-factory/AuthenticationError.js";
import Jwt from "../../utils/Jwt.js";
import Token from "../../utils/Token.js";
import MailService from "../others/mail.service.js";
import EmailTemplates from "../../utils/Templates.js";
import env from "../../../config/env.js";

class AuthService {
  // Register service
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
      verificationExpires: Date.now() + 1000 * 60 * 60,
    });

    // Auth token
    const token = Jwt.signToken({ id: newUser._id.toString() });

    // Verification URL (FULL URL)
    const verificationUrl = `${env.core.client_url}/verify?token=${rawToken}`;

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

  // Login service
  static login = async (input) => {
    const { email, password } = input;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.verifyPassword(password))) {
      throw new AuthenticationError("Invalid credentials");
    }

    if (!user.isVerified) {
      throw new AuthenticationError("Email is not verified");
    }

    const token = Jwt.signToken({ id: user._id.toString() });

    return {
      message: "User logged in",
      token,
      data: user.toObject(),
    };
  };

  // Logout service
  static logout = async () => {
    return { message: "User logged out" };
  };

  // Verify email service
  static verifyEmail = async (token) => {
    const user = await User.findOne({
      verificationToken: Token.hashToken(token),
      verificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new ValidationError("Invalid or expired token");
    }

    if (user.isVerified) {
      throw new ValidationError("Email already verified");
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationExpires = null;

    await user.save();

    return { message: "User verified" };
  };
}

export default AuthService;
