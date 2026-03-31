import logger from "../api/utils/logger.js";

const required = ["CLIENT_URL", "DB_URI", "JWT_SECRET", "JWT_EXPIRY"];

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
    client_url: process.env.CLIENT_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiry: process.env.JWT_EXPIRY,
  },
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    from: process.env.MAIL_FROM,
  },
};

export default Object.freeze(env);
