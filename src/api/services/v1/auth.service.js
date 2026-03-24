import User from "../../models/user.model.js";
import ValidationError from "../../utils/error-factory/ValidationError.js";
import AuthenticationError from "../../utils/error-factory/AuthenticationError.js";
import Jwt from "../../utils/Jwt.js";

class AuthService {
  // Register service
  static register = async (input) => {
    const { name, email, password } = input;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ValidationError("Email already registered");
    }

    try {
      const newUser = await User.create({ name, email, password });
      const token = Jwt.signToken({ id: newUser._id.toString() });

      return { message: "User registered", token, data: newUser.toObject() };
    } catch (err) {
      if (err.code === 11000) {
        throw new ValidationError("Email already registered");
      }
      throw err;
    }
  };

  // Login service
  static login = async (input) => {
    const { email, password } = input;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.verifyPassword(password))) {
      throw new AuthenticationError("Invalid credentials");
    }

    const token = Jwt.signToken({ id: user._id.toString() });

    return { message: "User logged in", token, data: user.toObject() };
  };

  // Logout service
  static logout = async () => {
    return { message: "User logged out" };
  };
}

export default AuthService;
