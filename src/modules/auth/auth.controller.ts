import { catchAsync } from "../../utils/catchAsync";
import { createUserIntoDB, deleteSingleUserFromDB } from "./auth.service";

//Create a User data
export const createUser = catchAsync(async (req, res) => {
  const result = await createUserIntoDB(req.body);
  res.status(201).send({
    success: true,
    message: "User created successfully!",
    statusCode: 201,
    data: result,
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
