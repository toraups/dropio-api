import logger from "../api/utils/logger.js";

const required = ["DB_URI", "JWT_SECRET", "JWT_EXPIRY"];

required.forEach((var_) => {
  if (!var_ || process.env[var_] === "" || process.env[var_] === undefined) {
    logger.error(`${var_} is not configured`);
    process.exit(1);
  }
});

const env = {
  core: {
    port: Number(process.env.PORT) || 3000,
    node_env: process.env.NODE_ENV || "development",
    db_uri: process.env.DB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiry: process.env.JWT_EXPIRY,
  },
};

export default Object.freeze(env);
