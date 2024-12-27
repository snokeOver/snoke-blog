import express from "express";

import { userLoginValidation, userRegistrationValidation } from "./auth.zod";
import { createUser, deleteSingleUser, loginUser } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateData";

const authRoute = express.Router();

authRoute.post(
  "/register",
  validateRequest(userRegistrationValidation),
  createUser
);
authRoute.post("/login", validateRequest(userLoginValidation), loginUser);

authRoute.delete("/delete-user/:id", deleteSingleUser);

export default authRoute;
