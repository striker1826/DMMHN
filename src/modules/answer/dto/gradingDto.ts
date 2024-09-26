import { ApiProperty } from '@nestjs/swagger';

export class GradingDto {
  @ApiProperty()
  question: string;

  @ApiProperty()
  answer: string;

  @ApiProperty()
  stacks: string[];

  @ApiProperty()
  previousQuestions: string[];
}
