import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SocialLoginDto {
  @ApiProperty({
    description: '카카오톡에서 받은 인증 코드 입니다.',
    type: 'string',
    example: 'YLBYOGEt0pgRYq1B7wa5D62_IG8T5Gs0voOcwXcnRLsU8zsd-zIATQAAAAQKKiVPAAABj9JqalQhI_W2iNNaeg',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'front의 개발환경',
    type: 'string',
    example: 'develop',
  })
  @IsString()
  context: string;
}
