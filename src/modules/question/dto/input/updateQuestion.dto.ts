import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateQuestion {
  @ApiProperty({
    type: 'string',
    description: '새롭게 반영될 질문 내용입니다.',
    example: '이 질문으로 변경하겠습니다.',
  })
  @IsString()
  @IsNotEmpty()
  question: string;
}
