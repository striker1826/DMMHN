import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class QuestionIdDto {
  @IsNotEmpty({ message: '필수 값입니다.' })
  @ApiProperty({ description: '질문의 아이디 입니다.', example: '1' })
  question_id: number;
}
