import { Model, Types } from "mongoose";

export interface IBlog {
  title: string;
  content: string;
  author: Types.ObjectId;
  isPublished?: boolean;
  isDeleted?: boolean;
  __v?: number;
}

export interface IBlogModel extends Model<IBlog> {
  isBlogExist(id: string): Promise<IBlog>;
}
