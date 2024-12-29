import { NextFunction, Request, Response } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const response = {
    success: false,
    message: "API not found",
    statusCode: 404,
    error: "The API or page you are looking for was not found.",
  };

  res.status(404).send(response);
  void next;
};
