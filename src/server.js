import app from "./app.js";
import env from "./config/env.js";
import logger from "./api/utils/logger.js";
import connectDb from "./config/database.js";

const startServer = async () => {
  try {
    await connectDb();

    app.listen(env.core.port, () => {
      logger.info(`Server running on port ${env.core.port}`);
    });
  } catch (error) {
    logger.error("Server startup failed");
    process.exit(1);
  }
};

startServer();
