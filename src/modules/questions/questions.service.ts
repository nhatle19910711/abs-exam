import { Injectable } from '@nestjs/common';
import { IQuestion, IUpdateQuestion } from './questions.interface';
import { QuestionRepository } from './questions.repository';
import * as fs from 'fs';
import * as Excel from 'exceljs';

@Injectable()
export class QuestionsService {
  constructor(private readonly repo: QuestionRepository) {}

  async getQuestion(id: string): Promise<IQuestion> {
    return this.repo.findOne({ _id: id });
  }

  async createQuestion(data: IQuestion): Promise<IQuestion> {
    return this.repo.create(data);
  }

  async updateQuestion(id: string, data: IUpdateQuestion): Promise<IQuestion> {
    return this.repo.findOneAndUpdate({ _id: id }, data);
  }

  async createQuestionsByExcelFile(file: Express.Multer.File) {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.load(file.buffer);

    const sheet = workbook.getWorksheet(1);
    const questionsPromise = [] as any;

    sheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        // Bỏ qua hàng tiêu đề nếu cần
        const rowData = [];
        row.eachCell((cell, colNumber) => {
          rowData.push(cell.value);
        });
        const data: IQuestion = {
          title: rowData[0],
          answers: {
            a: rowData[1],
            b: rowData[2],
            c: rowData[3],
            d: rowData[4],
          },
          answer: rowData[5],
          category: rowData[6],
        };
        questionsPromise.push(this.repo.create(data));
      }
    });

    return Promise.all(questionsPromise);
  }
}
