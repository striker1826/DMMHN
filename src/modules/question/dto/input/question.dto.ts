import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class Question {
  @ApiProperty({ type: 'string', description: '등록할 질문의 내용', example: '호이스팅에 대해서 설명해 주세요.' })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({ type: 'number', description: '등록할 질문의 세부 유형', example: '1' })
  @IsNotEmpty()
  subTypeId: number;
}
