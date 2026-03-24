import mongoose from "mongoose";
import env from "./env.js";
import logger from "../api/utils/logger.js";

const connectDb = async () => {
  mongoose.connection.on("connecting", () => {
    logger.info("Database connection established");
  });

  mongoose.connection.on("connected", () => {
    logger.info("Database connected");
  });

  mongoose.connection.on("disconnected", () => {
    logger.warn("Database disconnected");
  });

  mongoose.connection.on("error", () => {
    logger.error("Database connection error");
  });

  try {
    await mongoose.connect(env.core.db_uri);
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
};

process.on("SIGINT", () => {
  logger.warn("Database disconnected (SIGINT)");
  process.exit(0);
});

process.on("SIGTERM", () => {
  logger.warn("Database disconnected (SIGTERM)");
  process.exit(0);
});

export default connectDb;
