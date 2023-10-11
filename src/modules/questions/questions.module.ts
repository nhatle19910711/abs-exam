import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './questions.schema';
import { QuestionRepository } from './questions.repository';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Question.name, schema: QuestionSchema },
  ])],
  controllers: [QuestionsController],
  providers: [QuestionsService, QuestionRepository]
})
export class QuestionsModule {}
