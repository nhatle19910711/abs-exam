import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, PaginateModel } from 'mongoose';
import { BaseRepository } from 'src/base/base.repository';
import { Question, QuestionDocument } from './questions.schema';
import { IQuestion } from './questions.interface';

@Injectable()
export class QuestionRepository extends BaseRepository<QuestionDocument> {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: PaginateModel<QuestionDocument>,
  ) {
    super(questionModel);
  }

  async findOneAndUpdate(
    filter: FilterQuery<IQuestion>,
    data: Partial<IQuestion>,
  ): Promise<IQuestion> {
    return this.questionModel.findOneAndUpdate(filter, data, { new: true });
  }
}