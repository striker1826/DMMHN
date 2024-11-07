import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendEmailDto {
  @ApiProperty({
    example: 'example@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
