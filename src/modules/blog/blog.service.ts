import { JwtPayload } from "jsonwebtoken";
import { AppError } from "../../utils/error.class";
import { IBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";

// Create a Blog data
export const createBlogIntoDB = async (
  payload: Partial<IBlog>,
  user: JwtPayload
) => {
  payload.author = user.id;

  const createdBlog = await BlogModel.create(payload);

  if (!createdBlog)
    throw new AppError(509, "Bad Request", "Failed to create new Blog");

  const result = await BlogModel.findById(createdBlog._id).populate("author");

  if (!result)
    throw new AppError(509, "Bad Request", "Failed to create new Blog");

  const { title, content, _id, author, ...restResult } = result.toObject();

  void restResult;
  return {
    _id,
    title,
    content,
    author,
  };
};

// Delete single Blog data
export const deleteSingleBlogFromDB = async (id: string) => {
  const isBlogExist = await BlogModel.isBlogExist(id);

  if (!isBlogExist)
    throw new AppError(
      404,
      "Blog Not Found",
      "The blog you are trying to update does not exist!"
    );

  const result = await BlogModel.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );

  void result;

  return null;
};

// Update single Blog data
export const updateSingleBlogIntoDB = async (
  id: string,
  payload: Partial<IBlog>,
  user: JwtPayload
) => {
  const isBlogExist = await BlogModel.isBlogExist(id);

  if (!isBlogExist)
    throw new AppError(
      404,
      "Blog Not Found",
      "The blog you are trying to update does not exist!"
    );

  if (isBlogExist.author.toString() !== user.id.toString())
    throw new AppError(401, "UnAuthorized", "You are not authorizedd !");

  const result = await BlogModel.findByIdAndUpdate(id, payload, {
    new: true,
  }).populate("author");

  if (!result)
    throw new AppError(509, "Bad Request", "Failed to Update this Blog");

  const { title, content, _id, author, ...restResult } = result.toObject();

  void restResult;
  return {
    _id,
    title,
    content,
    author,
  };
};
