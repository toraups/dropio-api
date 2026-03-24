import rateLimit from "express-rate-limit";

/**
 * @typedef {"global" | "register" | "login"} RateLimitType
 */

/**
 * Generate a unique key per request
 * @param {import("express").Request} req
 * @param {RateLimitType} type
 */
const keyGenerator = (req, type) => {
  const ip = req.ip;

  if (type === "login" || type === "register") {
    const email =
      req.body?.email || req.query?.email || req.headers["x-user-email"];

    if (email) {
      return `${ip}:${email}`;
    }
  }

  return ip;
};

/**
 * Skip certain requests from rate limiting
 * @param {import("express").Request} req
 */
const skip = (req) => {
  return req.path === "/" || req.path === "/health";
};

/**
 * @type {Record<RateLimitType, import("express-rate-limit").Options>}
 */
const types = {
  global: {
    windowMs: 1000 * 60 * 15,
    message: "Too many requests. Try again later",
    max: 100,
  },

  register: {
    windowMs: 1000 * 60 * 60,
    message: "Too many accounts created from this IP/email",
    max: 3,
  },

  login: {
    windowMs: 1000 * 60 * 10,
    message: "Too many login attempts. Try again later",
    max: 5,

    // don't count successful logins
    skipSuccessfulRequests: true,
  },
};

/**
 * Create a rate limiter middleware
 * @param {RateLimitType} [type="global"]
 * @returns {import("express").RequestHandler}
 */
const rateLimiter = (type = "global") => {
  const config = types[type] || types.global;

  return rateLimit({
    ...config,

    keyGenerator: (req) => keyGenerator(req, type),
    skip,

    standardHeaders: true,
    legacyHeaders: false,

    // Optional: cleaner response
    handler: (req, res, _next, options) => {
      res.status(options.statusCode).json({
        success: false,
        message: options.message,
      });
    },
  });
};

export default rateLimiter;
