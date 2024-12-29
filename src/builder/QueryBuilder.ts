import { Query } from "mongoose";
import { AppError } from "../utils/error.class";

export class QueryBuilder<T> {
  constructor(
    public queryModel: Query<T[], T>,
    public query: Record<string, unknown>
  ) {}

  search(searchFields: string[]) {
    const searchTerm = this?.query?.search;
    const searchQuery = searchTerm
      ? {
          $or: searchFields.map((field) => ({
            [field]: { $regex: searchTerm, $options: "i" },
          })),
        }
      : {};

    this.queryModel = this.queryModel.find(searchQuery);
    return this;
  }

  filter() {
    const excludeFields = [
      "search",
      "sortBy",
      "sortOrder",
      "limit",
      "page",
      "fields",
    ];
    const copiedQuery = { ...this.query };

    excludeFields.forEach((el) => delete copiedQuery[el]);

    if (copiedQuery.filter)
      this.queryModel = this.queryModel.find({ _id: copiedQuery.filter });
    return this;
  }

  sort() {
    const sortBy = (this.query?.sortBy as string) || "createdAt"; // Default sortBy is createdAt

    // Validate sortOrder
    const sortOrdr = this.query?.sortOrder;
    if (sortOrdr && !["asc", "desc"].includes(sortOrdr as string)) {
      throw new AppError(
        400,
        "Bad Request",
        `Invalid sortOrder value: '${sortOrdr}'. Allowed values are 'asc' or 'desc'.`
      );
    }

    const sortOrder = this.query?.sortOrder === "asc" ? 1 : -1; // Default sortOrder is descending

    const sortQuery: Record<string, 1 | -1> = { [sortBy]: sortOrder };

    this.queryModel = this.queryModel.sort(sortQuery);
    return this;
  }

  paginate() {
    const limitQuery = Number(this?.query?.limit) || 10;
    const pageQuery = Number(this?.query?.page) || 1;
    const skipQuery = (pageQuery - 1) * limitQuery;

    this.queryModel = this.queryModel.skip(skipQuery).limit(limitQuery);
    return this;
  }

  selectFields() {
    const fieldsQuery =
      (this?.query?.fields as string)?.split(",").join(" ") ||
      "-__v -createdAt -updatedAt";

    this.queryModel = this.queryModel.select(fieldsQuery);
    return this;
  }
}
