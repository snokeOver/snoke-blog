import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModel } from "./auth.model";
import { AppError } from "../../utils/error.class";
import { IUser } from "./auth.interface";

export const createToken = (
  jwtPayload: JwtPayload,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const authenticateUser = async (
  foundUser: IUser,
  iat?: number,
  plainPssword?: string
) => {
  if (!foundUser)
    throw new AppError(404, "Not Exist", "This user doesn't exist !");

  if (foundUser.isBlocked)
    throw new AppError(403, "Forbidden", "This user is blocked !");

  if (foundUser.isDeleted)
    throw new AppError(403, "Forbidden", "This user is deleted !");

  //Revalidate token
  if (
    foundUser.passwordChangedAt &&
    iat &&
    UserModel.isJWTValidYet(foundUser.passwordChangedAt, iat)
  )
    throw new AppError(401, "UnAuthorized", "You are not authorized !");

  // //password validation
  if (
    plainPssword &&
    !(await UserModel.isPasswordMatched(plainPssword, foundUser.password))
  )
    throw new AppError(403, "Forbidden", "Passoword Not matched !");
};
