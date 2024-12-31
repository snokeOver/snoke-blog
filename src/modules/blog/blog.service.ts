import { JwtPayload } from "jsonwebtoken";
import { AppError } from "../../utils/error.class";
import { IBlog } from "./blog.interface";
import { BlogModel } from "./blog.model";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { blogSearchFields } from "./blog.constant";

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
export const deleteSingleBlogFromDB = async (id: string, user: JwtPayload) => {
  const isBlogExist = await BlogModel.isBlogExist(id);

  //Check ownership
  if (isBlogExist?.author?.toString() !== user?.id?.toString())
    throw new AppError(
      401,
      "UnAuthorized",
      "You are not the owner of this blog !"
    );

  const result = await BlogModel.findOneAndUpdate(
    { _id: id },
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
      "The Blog you are trying to access does not exist!"
    );

  //Check ownership
  if (isBlogExist?.author?.toString() !== user?.id?.toString())
    throw new AppError(
      401,
      "UnAuthorized",
      "You are not the owner of this blog !"
    );

  const result = await BlogModel.findOneAndUpdate({ _id: id }, payload, {
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

// Get all blog
export const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(BlogModel.find().populate("author"), query)
    .search(blogSearchFields)
    .filter()
    .sort()
    .paginate()
    .selectFields();

  const result = await blogQuery.queryModel;

  return result;
};
