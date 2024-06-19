import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/user-decorator';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    description: '유저의 access_token으로 유저의 정보를 가져오는 API 입니다.',
  })
  @ApiBearerAuth('access-token')
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @UseGuards(AuthGuard('jwt'))
  @Get('info')
  async getUsersByToken(@User() userId: number) {
    const user = await this.userService.getUserByUserId(userId);
    return user;
  }
}
