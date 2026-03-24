import * as yup from "yup";
import ValidationError from "../utils/error-factory/ValidationError.js";

const validate = (schema) => async (req, res, next) => {
  try {
    // Validate body only
    if (schema instanceof yup.ObjectSchema) {
      req.body = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      return next();
    }

    // Validate query
    if (schema.query) {
      const validatedQuery = await schema.query.validate(req.query, {
        abortEarly: false,
        stripUnknown: true,
      });

      Object.keys(req.query).forEach((key) => delete req.query[key]);
      Object.assign(req.query, validatedQuery);
    }

    // Validate body
    if (schema.body) {
      req.body = await schema.body.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
    }

    // Validate params
    if (schema.params) {
      req.params = await schema.params.validate(req.params, {
        abortEarly: false,
        stripUnknown: true,
      });
    }

    return next();
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const details = error.inner.map((err) => ({
        field: err.path || "Unknown",
        message: err.message,
      }));

      return next(new ValidationError("Validation failed", details));
    }

    return next(error);
  }
};

export default validate;
