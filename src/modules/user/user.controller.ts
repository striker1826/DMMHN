import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/user-decorator';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    description: '카카오에서 받은 인증 코드로 accessToken을 받을 수 있는 API 입니다.',
  })
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @UseGuards(AuthGuard('jwt'))
  @Get('token')
  async getUsersByToken(@User() userId: number) {
    const user = await this.userService.getUserByUserId(userId);
    return user;
  }
}
