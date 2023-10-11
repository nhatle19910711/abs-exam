import { Controller, HttpStatus, Post, Body, Get, Param, Patch,UploadedFile, UseInterceptors } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QuestionDto, QuestionResponse, UpdateQuestionDto } from './questions.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('questions')
@ApiTags('Questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get(':id')
  @ApiOperation({
    operationId: 'getQuestion',
    description: 'Get detail a question',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get detail a question',
    type: QuestionResponse,
  })
  getQuestion(@Param('id') id: string): Promise<QuestionResponse> {
    return this.questionsService.getQuestion(id)
  }

  @Post()
  @ApiOperation({
    operationId: 'createQuestion',
    description: 'Create a new question',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create a new question',
    type: QuestionResponse,
  })
  createQuestion(@Body() data: QuestionDto): Promise<QuestionResponse> {
    return this.questionsService.createQuestion(data)
  }

  @Post('excel')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create multiple questions',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['file'],
    },
  })
  @ApiOperation({
    operationId: 'createQuestionsByExcelFile',
    description: 'Create multiple questions by excel file',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create multiple questions by excel file',
    type: [QuestionResponse],
  })
  createQuestionsByExcelFile(@UploadedFile() file: Express.Multer.File) {
    return this.questionsService.createQuestionsByExcelFile(file)
  }

  @Patch(':id')
  @ApiOperation({
    operationId: 'updateQuestion',
    description: 'Update question',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update question',
    type: QuestionResponse,
  })
  updateQuestion(@Param('id') id: string, @Body() data: UpdateQuestionDto): Promise<QuestionResponse> {
    return this.questionsService.updateQuestion(id, data)
  }
}
