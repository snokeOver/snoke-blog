import { ErrorRequestHandler } from "express";

import { nodeEnv } from "..";

import { IErrorSource } from "../types-interface/err";
import { handleZodError } from "./handleZodError";
import { handleValidationError } from "./handleValidationError";
import { handleStrictMode } from "./handleStrictMode";
import { handleCastError } from "./handleCastError";
import { handleDuplicateError } from "./handleDuplicateError";
import { AppError } from "../utils/error.class";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let errorMsg = "Something Went Wrong!";
  let statusCode = err.statusCode || 500;

  let error: IErrorSource[] = [{ path: "", message: "Something Went Wrong!" }];

  // console.log(error);

  //Check for specific error
  if (err instanceof AppError) {
    //Errors we throw by AppError
    statusCode = err.statusCode;
    errorMsg = err.name;
    error = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err.name === "StrictModeError") {
    //Mongoose strict mode error
    const { status, message, sources } = handleStrictMode(err);

    statusCode = status;
    errorMsg = message;
    error = sources;
  } else if (err.code === 11000) {
    // Mongoose duplicate value for unique field
    const { status, message, sources } = handleDuplicateError(err);
    statusCode = status;
    errorMsg = message;
    error = sources;
  } else if (err.name === "ZodError") {
    //Zod validation error
    const { status, message, sources } = handleZodError(err);

    statusCode = status;
    errorMsg = message;
    error = sources;
  } else if (err.name === "ValidationError") {
    //Mongoose validation error
    const { status, message, sources } = handleValidationError(err);

    statusCode = status;
    errorMsg = message;
    error = sources;
  } else if (err.name === "CastError") {
    //Mongoose cast error for wrong params
    const { status, message, sources } = handleCastError(err);

    statusCode = status;
    errorMsg = message;
    error = sources;
  } else if (err instanceof Error) {
    //Errors we throw by AppError

    errorMsg = err.message;
    error = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else {
    errorMsg = err.message || "Server error";
  }

  const response = {
    success: false,
    message: errorMsg,
    statusCode,
    error,
    stack: err?.stack,
    // ...(nodeEnv === "development" && { stack: err?.stack }),
    // showError: err,
  };

  res.status(statusCode).send(response);
  void next;
};
