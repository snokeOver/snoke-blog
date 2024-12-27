import { ILoginUser, IUser } from "./auth.interface";
import { UserModel } from "./auth.model";

import { AppError } from "../../utils/error.class";
import { createToken } from "./auth.utils";
import {
  jwt_access_expire,
  jwt_access_secret,
  jwt_refresh_expire,
  jwt_refresh_secret,
} from "../..";

// import { status } from "http-status";

// Create a User data
export const createUserIntoDB = async (payload: Partial<IUser>) => {
  const result = await UserModel.create(payload);

  if (!result)
    throw new AppError(509, "Bad Request", "Failed to create new user");

  const { name, email, _id, ...restResult } = result.toObject();

  void restResult;
  return {
    _id,
    name,
    email,
  };
};

//Authenticate User Login
export const authenticateUserLogin = async (payload: ILoginUser) => {
  const foundUser = await UserModel.isUserExist(payload.email);

  if (!foundUser)
    throw new AppError(404, "Not Exist", "This user doesn't exist !");

  if (foundUser.isBlocked)
    throw new AppError(403, "Forbidden", "This user is blocked !");

  // //password check
  if (
    !(await UserModel.isPasswordMatched(payload.password, foundUser.password))
  )
    throw new AppError(403, "Forbidden", "Passoword Not matched !");

  const jwtPayload = {
    email: foundUser.email,
    role: foundUser.role,
  };
  const accessToken = createToken(
    jwtPayload,
    jwt_access_secret as string,
    jwt_access_expire as string
  );

  const refreshToken = createToken(
    jwtPayload,
    jwt_refresh_secret as string,
    jwt_refresh_expire as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

//delete a User from database
export const deleteSingleUserFromDB = async (id: string) => {
  const deletedUser = await UserModel.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );

  return deletedUser;
};
