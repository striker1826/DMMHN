import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EvaluationInputDto {
  @ApiProperty({ type: 'string', description: '질문의 내용', example: '호이스팅에 대해서 설명해 주세요.' })
  @IsString({ message: 'question은 문자열이어야 합니다.' })
  @IsNotEmpty({ message: 'question은 필수값입니다.' })
  question: string;

  @ApiProperty({
    type: 'string',
    description: '답변의 내용',
    example:
      '호이스팅이란 자바스크립트가 메모리를 미리 확보하는 작업을 의미합니다. 해당 작업은 마치 식별자들을 위로 끌어올리는 것 같은 착각을 주기 때문에 호이스팅이라는 이름이 붙게 되었습니다.',
  })
  @IsString({ message: 'question은 문자열이어야 합니다.' })
  @IsNotEmpty({ message: 'question은 필수값입니다.' })
  answer: string;
}
