import { catchAsync } from "../../utils/catchAsync";
import { deleteSingleBlogByAdminFromDB } from "./admin.service";

//Delete a blog by admin
export const deleteSingleBlogByAdmin = catchAsync(async (req, res) => {
  const result = await deleteSingleBlogByAdminFromDB(req.params.id);
  res.status(200).send({
    success: true,
    message: "Blog deleted successfully!",
    statusCode: 200,
    data: result,
  });
});
