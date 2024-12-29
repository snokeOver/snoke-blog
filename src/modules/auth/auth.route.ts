import express from "express";

import {
  refreshTokenValidation,
  userLoginValidation,
  userRegistrationValidation,
} from "./auth.validation";
import {
  createUser,
  deleteSingleUser,
  getTokenByRefreshToken,
  loginUser,
} from "./auth.controller";

import {
  validateRequest,
  validateTokenRequest,
} from "../../middlewares/validateData";

const authRoute = express.Router();

authRoute.post(
  "/register",
  validateRequest(userRegistrationValidation),
  createUser
);

authRoute.post("/login", validateRequest(userLoginValidation), loginUser);

authRoute.post(
  "/refresh-token",
  validateTokenRequest(refreshTokenValidation),
  getTokenByRefreshToken
);

//either delete/block/both will be implemented
authRoute.delete("/delete-user/:id", deleteSingleUser);

export default authRoute;
