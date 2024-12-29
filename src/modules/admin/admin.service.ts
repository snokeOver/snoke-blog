import { UserModel } from "../auth/auth.model";
import { BlogModel } from "../blog/blog.model";

//delete a Blogs from database
export const deleteSingleBlogByAdminFromDB = async (id: string) => {
  const deletedUser = await BlogModel.findOneAndUpdate(
    { _id: id },
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );

  return deletedUser;
};

//Block single user from database
export const blockSingleUserByAdminIntoDB = async (id: string) => {
  const deletedUser = await UserModel.findOneAndUpdate(
    { _id: id },
    {
      isBlocked: true,
    },
    {
      new: true,
    }
  );

  return deletedUser;
};
