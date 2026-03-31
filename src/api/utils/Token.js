import crypto from "crypto";

class Token {
  // Create token
  static generateToken = () => {
    const token = crypto.randomBytes(32).toString("hex");
    return token;
  };

  // Hash token
  static hashToken = (token) => {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    return hashedToken;
  };
}

export default Token;
