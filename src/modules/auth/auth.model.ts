import { model, Schema } from "mongoose";
import { IUser, IUserModel } from "./auth.interface";
import { saltRound } from "../..";
import bcrypt from "bcrypt";
import { AppError } from "../../utils/error.class";

const userSchema = new Schema<IUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: 0,
    },

    passwordChangedAt: {
      type: Date,
      default: new Date(),
    },

    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
      },
      default: "user",
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    strict: "throw", // prevents extra fields and throw error
  }
);

//Pre save middleware: will work on create() and save() to encrypt password
userSchema.pre("save", async function () {
  const isUserExist = await UserModel.findOne({
    email: this.email,
  });

  if (isUserExist)
    throw new AppError(409, "Duplicate Email", "This User is already exist !");

  this.password = await bcrypt.hash(this.password, Number(saltRound));
});

//To check if the user id exist or not before delete
userSchema.pre("findOneAndUpdate", async function () {
  const isUserExist = await UserModel.findOne(this.getQuery());
  if (!isUserExist) {
    throw new AppError(
      404,
      "User Not Found",
      "The user you are trying to update does not exist!"
    );
  }
});

//static method
userSchema.statics.isUserExist = async function (email: string) {
  return await UserModel.findOne({
    email,
    isDeleted: false,
  }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  password: string,
  hashedPass
) {
  return await bcrypt.compare(password, hashedPass);
};

userSchema.statics.isJWTValidYet = function (
  passChangedAt: Date,
  jwtIssuedAt: number
) {
  const passwordChageTime = new Date(passChangedAt).getTime() / 1000;
  return passwordChageTime > jwtIssuedAt;
};

export const UserModel = model<IUser, IUserModel>("users", userSchema);