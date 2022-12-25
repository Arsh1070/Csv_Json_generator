class Service {
  constructor(model) {
    this._model = model;
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.findOne = this.findOne.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.removeByQuery = this.removeByQuery.bind(this);
    this.count = this.count.bind(this);
  }

  async findAll(query) {
    const { filter, skip, limit, sort, population } = query;
    const result = await this._model.paginate(filter, {
      offset: skip || 0,
      limit: limit || 25,
      sort: sort || "-createdAt",
      populate: population,
    });

    return result;
  }

  async findById(id) {
    const result = await this._model.findById(id);
    return result;
  }

  async findOne(data) {
    const result = await this._model.findOne(data);
    return result;
  }

  async find(data) {
    const result = await this._model.find(data);
    return result;
  }

  async count(data) {
    const result = await this._model.count(data);
    return result;
  }

  async create(data) {
    const result = await this._model.create(data);
    return result;
  }

  async update(id, data) {
    const result = await this._model.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
      context: "query",
    });
    return result;
  }

  async remove(id) {
    const result = await this._model.findByIdAndRemove(id);
    return result;
  }

  async removeByQuery(query) {
    const result = await this._model.deleteMany(query);
    return result;
  }
}

export default Service;
