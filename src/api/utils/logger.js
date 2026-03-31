import fs from "fs";
import path from "path";
import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import Context from "./Context.js";

const NODE_ENV = process.env.NODE_ENV || "development";
const LOG_DIR = path.resolve("logs");

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

// Levels
const levels = {
  levels: {
    warn: 1,
    audit: 2,
    debug: 5,
    http: 3,
    error: 0,
    info: 4,
  },

  logWithLevel: (level, payload) => {
    return logger.log({ level, message: payload });
  },
};

// Colors
const colors = {
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  purple: "\x1b[35m",
  blue: "\x1b[34m",
  green: "\x1b[32m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  reset: "\x1b[0m",

  mapLevel: function (level) {
    switch (level) {
      case "error":
        return this.red;
      case "warn":
        return this.yellow;
      case "audit":
        return this.purple;
      case "http":
        return this.cyan;
      case "info":
        return this.green;
      case "verbose":
        return this.white;
      case "debug":
        return this.blue;
      default:
        return this.reset;
    }
  },

  colorLevel: function (level) {
    const color = colors.mapLevel(level);
    return `${color}${level.toUpperCase()}${this.reset}`;
  },

  colorStatus: function (code) {
    const status = Number(code);
    if (status >= 500) return `${this.red}${code}${this.reset}`;
    if (status >= 400) return `${this.yellow}${code}${this.reset}`;
    return `${this.green}${code}${this.reset}`;
  },
};

// Formats
const formats = {
  // Console format
  console: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf((info) => {
      const requestId = Context.getContext()?.requestId;
      const { timestamp, level, message } = info;

      // HTTP Logging
      if (typeof message === "object" && level === "http") {
        const { method, url, status, responseTime, contentLength } = message;
        return `${timestamp} [${colors.colorLevel(level)}]: ${requestId ? `${requestId} ` : ""}${method} ${url} ${colors.colorStatus(status)} ${responseTime} ms - ${contentLength}`;
      }

      // General Logging
      if (typeof message === "object") {
        return `${timestamp} [${colors.colorLevel(level)}]: ${requestId ? `${requestId} ` : ""}${message?.message ?? JSON.stringify(message)}`;
      }

      return `${timestamp} [${colors.colorLevel(level)}]: ${requestId ? `${requestId} ` : ""}${message}`;
    }),
  ),

  // File format
  file: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf((info) => {
      const { timestamp, level, message, ...meta } = info;
      const subMeta = { environment: NODE_ENV, service: "dropio-api" };

      if (typeof message === "object" && message !== null) {
        return JSON.stringify({
          timestamp,
          level,
          ...message,
          ...meta,
          ...subMeta,
        });
      }

      return JSON.stringify({
        timestamp,
        level,
        message,
        ...meta,
        ...subMeta,
      });
    }),
  ),
};

// Initialize logger
const logger = winston.createLogger({
  levels: levels.levels,
  transports: [
    // Console transport
    new winston.transports.Console({
      level: NODE_ENV === "development" ? "debug" : "info",
      format: formats.console,
    }),

    // File transport
    new DailyRotateFile({
      filename: path.join(LOG_DIR, "%DATE%.log"),
      datePattern: "YYYY-MM-DD",
      format: formats.file,
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "7d",
    }),
  ],
});

logger.info = (p) => levels.logWithLevel("info", p);
logger.http = (p) => levels.logWithLevel("http", p);
logger.error = (p) => levels.logWithLevel("error", p);
logger.audit = (p) => levels.logWithLevel("audit", p);
logger.debug = (p) => levels.logWithLevel("debug", p);
logger.warn = (p) => levels.logWithLevel("warn", p);

export default logger;
