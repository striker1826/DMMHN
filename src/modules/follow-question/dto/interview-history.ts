import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InterviewHistory {
  @ApiProperty({ type: 'assistant | user', description: '대화의 주체' })
  @IsString({ message: 'role은 문자열이어야 합니다.' })
  @IsNotEmpty({ message: 'role은 필수값입니다.' })
  role: 'assistant' | 'user';

  @ApiProperty({ type: 'string', description: '대화의 내용' })
  @IsString({ message: 'content는 문자열이어야 합니다.' })
  @IsNotEmpty({ message: 'content는 필수값입니다.' })
  content: string;
}
