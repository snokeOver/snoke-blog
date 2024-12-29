import { Model, Types } from "mongoose";
import { USER_ROLE } from "./admin.constant";

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IUser extends ILoginUser {
  name: string;
  passwordChangedAt?: Date;
  role?: "admin" | "user";
  isBlocked?: boolean;
  isDeleted?: boolean;
  __v?: number;
  _id?: Types.ObjectId;
}

export interface IChangeUserPassword {
  oldPassword: string;
  newPassword: string;
}

export interface IUserModel extends Model<IUser> {
  isUserExist(email: string): Promise<IUser>;
  isPasswordMatched(password: string, hashedPass: string): Promise<boolean>;
  isJWTValidYet(passChangedAt: Date, jwtIssuedAt: number): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
