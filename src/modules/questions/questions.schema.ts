import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QuestionDocument = HydratedDocument<Question>;

@Schema({_id: false})
export class Answer {
  @Prop()
  a: string;

  @Prop()
  b: number;

  @Prop()
  c: string;

  @Prop()
  d: string;

  @Prop()
  e: string;
}



@Schema()
export class Question {
  @Prop({type: String, required: true})
  title: string;

  @Prop({type: Answer, required: true})
  answers: Answer;

  @Prop({type: String, required: true})
  answer: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);