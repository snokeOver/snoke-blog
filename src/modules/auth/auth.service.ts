import { IUser } from "./auth.interface";
import { UserModel } from "./auth.model";

import { AppError } from "../../utils/error.class";

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
