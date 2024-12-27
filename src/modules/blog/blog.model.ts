import { model, Schema } from "mongoose";

import { AppError } from "../../utils/error.class";
import { IBlog, IBlogModel } from "./blog.interface";

const blogSchema = new Schema<IBlog, IBlogModel>(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    isPublished: {
      type: Boolean,
      default: false,
      select: 0,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      select: 0,
    },
  },
  {
    timestamps: true,
    strict: "throw", // prevents extra fields and throw error
  }
);

//Pre save middleware: will work on create() and save() to encrypt password
// blogSchema.pre("save", async function () {
//   const isUserExist = await BlogModel.findOne({
//     email: this.email,
//   });

//   if (isUserExist)
//     throw new AppError(409, "Duplicate Email", "This User is already exist !");

//   this.password = await bcrypt.hash(this.password, Number(saltRound));
// });

//To check if the user id exist or not before delete

//static method
blogSchema.statics.isBlogExist = async function (id: string) {
  return await BlogModel.findOne({
    _id: id,
    isDeleted: false,
    isPublished: true,
  }).select("+isPublished");
};

// blogSchema.pre("findOneAndUpdate", async function () {
//   const isUserExist = await BlogModel.findOne(this.getQuery());
//   if (!isUserExist) {
//     throw new AppError(
//       404,
//       "Blog Not Found",
//       "The blog you are trying to update does not exist!"
//     );
//   }
// });

export const BlogModel = model<IBlog, IBlogModel>("blogs", blogSchema);
