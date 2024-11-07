import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class ConfirmEmailDto {
  @ApiProperty({
    example: 'example@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '123456',
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  code: string;
}
