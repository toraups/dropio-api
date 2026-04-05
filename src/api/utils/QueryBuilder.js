class QueryBuilder {
  constructor(model, queryParams) {
    this.model = model;
    this.queryParams = queryParams;
    this.query = model.find();
  }

  filter() {
    const queryObj = { ...this.queryParams };
    const excludedFields = ["page", "sort", "limit", "fields", "search"];
    excludedFields.forEach((field) => delete queryObj[field]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`,
    );

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryParams.sort) {
      const sortBy = this.queryParams.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryParams.fields) {
      const fields = this.queryParams.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v -password");
    }
    return this;
  }

  pagination() {
    const page = parseInt(this.queryParams.page, 10) || 1;
    const limit = parseInt(this.queryParams.limit, 10) || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  search(searchFields = []) {
    if (this.queryParams.search && searchFields.length) {
      const regex = new RegExp(this.queryParams.search, "i");
      const searchQuery = searchFields.map((field) => ({ [field]: regex }));
      this.query = this.query.find({ $or: searchQuery });
    }
    return this;
  }

  populateFilter(populateFields = []) {
    populateFields.forEach((pop) => {
      const { path, match } = pop;

      if (match) {
        this.query = this.query.populate({ path, match });
      } else {
        this.query = this.query.populate(path);
      }
    });
    return this;
  }

  async exec() {
    return await this.query;
  }
}

export default QueryBuilder;
