import express from "express";

import { userValidation } from "./auth.zod";
import { createUser, deleteSingleUser } from "./auth.controller";
import { validateRequest } from "../../middlewares/validateData";

const authRoute = express.Router();

authRoute.post("/register", validateRequest(userValidation), createUser);

authRoute.delete("/delete-user/:id", deleteSingleUser);

export default authRoute;
