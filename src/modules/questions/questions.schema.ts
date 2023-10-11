import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as paginate from 'mongoose-paginate-v2';

export type QuestionDocument = HydratedDocument<Question>;

@Schema({_id: false})
export class Answer {
  @Prop()
  a: string;

  @Prop()
  b: string;

  @Prop()
  c: string;

  @Prop()
  d: string;

  @Prop()
  e: string;
}

@Schema({timestamps: true})
export class Question {
  @Prop({type: String, required: true})
  title: string;

  @Prop({type: Answer, required: true})
  answers: Answer;

  @Prop({type: String, required: true})
  answer: string;

  @Prop({type: String, required: true})
  category: string;
}

const QuestionSchema = SchemaFactory.createForClass(Question);
QuestionSchema.plugin(paginate)
QuestionSchema.index({ createdAt: -1 });

export {QuestionSchema}