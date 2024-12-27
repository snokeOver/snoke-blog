import { nodeEnv } from "../..";
import { catchAsync } from "../../utils/catchAsync";
import {
  authenticateUserLogin,
  createUserIntoDB,
  deleteSingleUserFromDB,
} from "./auth.service";

//Create a User data
export const createUser = catchAsync(async (req, res) => {
  const result = await createUserIntoDB(req.body);
  res.status(201).send({
    success: true,
    message: "User registered successfully!",
    statusCode: 201,
    data: result,
  });
});

//Login user
export const loginUser = catchAsync(async (req, res) => {
  const result = await authenticateUserLogin(req.body);
  const { accessToken, refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: nodeEnv !== "development",
    httpOnly: true,
  });

  res.status(200).send({
    success: true,
    message: "Login successfull",
    statusCode: 200,
    data: {
      accessToken,
    },
  });
});

//Delete a User data
export const deleteSingleUser = catchAsync(async (req, res) => {
  const result = await deleteSingleUserFromDB(req.params.id);
  res.status(201).send({
    success: true,
    message: "User deleted successfully!",
    statusCode: 201,
    data: result,
  });
});
