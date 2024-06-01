import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SubTypeDto {
  @IsNotEmpty({ message: '필수 값입니다.' })
  @ApiProperty({ description: '세부 유형의 아이디 입니다.', example: '1' })
  subtype_id: number;
}
