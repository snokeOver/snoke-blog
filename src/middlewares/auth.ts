import { NextFunction, Request, Response } from "express";

import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/error.class";
import jwt, { JwtPayload } from "jsonwebtoken";

import { jwt_access_secret } from "..";
import { authenticateUser } from "../modules/auth/auth.utils";
import { UserModel } from "../modules/auth/auth.model";
import { TUserRole } from "../modules/auth/auth.interface";

export const auth = (...userRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    //Check if token is present
    if (!token)
      throw new AppError(401, "UnAuthorized", "You are not authorized !");

    //Check if token is valid
    const decoded = jwt.verify(
      token,
      jwt_access_secret as string
    ) as JwtPayload;

    const { role, email, iat } = decoded;

    //Check if the user has permission
    const foundUser = await UserModel.isUserExist(email);

    await authenticateUser(foundUser, iat, undefined);

    if (userRole && !userRole.includes(role))
      throw new AppError(401, "UnAuthorized", "You are not authorized !");

    decoded.id = foundUser._id;
    req.user = decoded as JwtPayload;
    next();
  });
};
