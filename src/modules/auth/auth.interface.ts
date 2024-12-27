import { Model } from "mongoose";
import { USER_ROLE } from "./auth.constant";

export interface IUser {
  name: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  role?: "admin" | "user";
  isBlocked?: boolean;
  isDeleted?: boolean;
  __v?: number;
}

export interface IUserModel extends Model<IUser> {
  isUserExist(id: string): Promise<IUser>;
  isPasswordMatched(password: string, hashedPass: string): Promise<boolean>;
  isJWTValidYet(passChangedAt: Date, jwtIssuedAt: number): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
