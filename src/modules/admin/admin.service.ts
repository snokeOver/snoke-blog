import { BlogModel } from "../blog/blog.model";

//delete a Blogs from database
export const deleteSingleBlogByAdminFromDB = async (id: string) => {
  const deletedUser = await BlogModel.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );

  return deletedUser;
};
