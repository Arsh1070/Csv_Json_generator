import { isCelebrateError as isCelebrate } from "celebrate";
import httpStatus from "http-status";
import Response from "./response.js";

export const errorHandle = (error, req, res, next) => {
  if (typeof error === "string") {
    // custom application error
    return Response.error(res, {
      message: "Bad Request",
      code: 400,
      errors: error,
    });
  } else if (isCelebrate(error)) {
    return Response.error(res, {
      message: "Bad Request",
      code: 400,
      errors: [...error.details.entries()].map(([key, joiError]) => ({
        key: key,
        message: joiError.details.map((ele) => ele.message),
      })),
    });
  } else if (error.name === "CRUD_ERROR") {
    return Response.error(
      res,
      {
        message: error.message,
        code: error.code || 400,
      },
      error.code || 400
    );
  } else if (error.name === "CastError" && error.kind === "ObjectId") {
    return Response.error(res, {
      // code: error.name,
      message: "Bad Request",
      code: 400,
      errors: "malformatted id",
    });
  } else if (error.name === "ValidationError") {
    return Response.error(res, {
      message: "Bad Request",
      code: 400,
      errors: error.message,
    });
  } else if (error.name === "Error") {
    return Response.error(res, {
      message: "Bad Request",
      code: 400,
      errors: error.message,
    });
  } else if (error.name === "CustomError") {
    return Response.error(res, {
      message: "Bad Request",
      code: 400,
      errors: error,
    });
  }
  // default to 500 server error

  return Response.error(
    res,
    {
      message: error.message,
    },
    httpStatus.INTERNAL_SERVER_ERROR
  );
};

export const logErrors = (err, req, res, next) => {
  // console.error(err.stack);
  next(err);
};

export const notFoundHandle = (req, res, next) => {
  return Response.error(
    res,
    {
      code: "404",
      message: "Page Not Found",
    },
    404
  );
};
