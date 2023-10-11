import {
  Document,
  FilterQuery,
  PaginateModel,
  PaginateOptions,
} from 'mongoose';

import * as  paginate from 'mongoose-paginate-v2';

export abstract class BaseRepository<T extends Document> {
  constructor(protected readonly entityModel: PaginateModel<T>) {
    this.entityModel = entityModel;
  }

  async find(query: FilterQuery<T>) {
    return this.entityModel.find(query).lean().exec();
  }

  async findOne(query: FilterQuery<T>) {
    return this.entityModel.findOne(query).exec();
  }

  async create(data: object) {
    return this.entityModel.create(data);
  }

  async update(query: FilterQuery<T>, data: object) {
    return this.entityModel.findOneAndUpdate(query, data, { new: true });
  }

  async deleteOne(query: FilterQuery<T>) {
    return this.entityModel.deleteOne(query);
  }

  async paginate(query: FilterQuery<T>, option: PaginateOptions) {
    return this.entityModel.paginate(query, option);
  }
}