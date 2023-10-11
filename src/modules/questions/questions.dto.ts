import { ApiProperty } from "@nestjs/swagger";
import { IAnswers, IQuestion, IUpdateQuestion } from "./questions.interface";
import { IsOptional, IsString, IsNotEmpty, IsNotEmptyObject, IsObject, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';

export class AnswersDto implements IAnswers {
    @ApiProperty({type: String, required: false})
    @IsOptional()
    @IsString()
    a?: string;

    @ApiProperty({type: String, required: false})
    @IsOptional()
    @IsString()
    b?: string;

    @ApiProperty({type: String, required: false})
    @IsOptional()
    @IsString()
    c?: string;

    @ApiProperty({type: String, required: false})
    @IsOptional()
    @IsString()
    d?: string;

    @ApiProperty({type: String, required: false})
    @IsOptional()
    @IsString()
    e?: string;
}

export class QuestionDto implements IQuestion {
    @ApiProperty({type: String, required: true})
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({type: AnswersDto, required: true})
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => AnswersDto)
    answers: AnswersDto;

    @ApiProperty({type: String, required: true})
    @IsNotEmpty()
    @IsString()
    answer: string;

    @ApiProperty({type: String, required: true})
    @IsNotEmpty()
    @IsString()
    category: string;
}

export class QuestionResponse implements IQuestion {
    @ApiProperty({type: String, required: true})
    title: string;

    @ApiProperty({type: Object, required: true})
    answers: AnswersDto;

    @ApiProperty({type: String, required: true})
    answer: string;

    @ApiProperty({type: String, required: true})
    category: string;
}

export class UpdateQuestionDto implements IUpdateQuestion {
        @ApiProperty({type: String, required: false})
        @IsOptional()
        @IsString()
        title?: string;
    
        @ApiProperty({type: AnswersDto, required: false})
        @IsNotEmptyObject()
        @IsObject()
        @IsOptional()
        @ValidateNested()
        @Type(() => AnswersDto)
        answers?: AnswersDto;
    
        @ApiProperty({type: String, required: false})
        @IsOptional()
        @IsString()
        answer?: string;
    
        @ApiProperty({type: String, required: false})
        @IsOptional()
        @IsString()
        category?: string;
}