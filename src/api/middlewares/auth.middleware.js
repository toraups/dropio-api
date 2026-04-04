import Jwt from "../utils/Jwt.js";
import User from "../models/user.model.js";
import AuthenticationError from "../utils/error-factory/AuthenticationError.js";
import NotFoundError from "../utils/error-factory/NotFoundError.js";

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AuthenticationError("Invalid or missing JWT token");
  }

  const token = authHeader.split(" ")[1];
  const decoded = Jwt.verifyToken(token);
  const user = await User.findById(decoded.id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  req.user = user.toObject();
  next();
};

export default protect;
