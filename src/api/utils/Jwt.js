import jwt from "jsonwebtoken";
import env from "../../config/env.js";
import ApiError from "./error-factory/ApiError.js";
import AuthenticationError from "./error-factory/AuthenticationError.js";

class Jwt {
  static signToken = (payload) => {
    try {
      return jwt.sign(payload, env.jwt.secret, {
        algorithm: "HS256",
        expiresIn: env.jwt.expiry,
      });
    } catch (error) {
      throw new ApiError("Error creating JWT token");
    }
  };

  static verifyToken = (token) => {
    try {
      return jwt.verify(token, env.jwt.secret, {
        algorithms: ["HS256"],
      });
    } catch (error) {
      throw new AuthenticationError("Invalid JWT token");
    }
  };
}

export default Jwt;
