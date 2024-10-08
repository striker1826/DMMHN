import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SocialLoginDto } from './dto/input/social-login.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { KakaoLoginResponse } from 'src/common/swagger/auth/kakaoLogin';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description: '카카오에서 받은 인증 코드로 accessToken을 받을 수 있는 API 입니다.',
  })
  @ApiCreatedResponse(KakaoLoginResponse.created)
  @ApiUnauthorizedResponse(KakaoLoginResponse.unAuthorized)
  @Post('kakao')
  async kakaoLogin(@Body() body: SocialLoginDto) {
    const tokens = await this.authService.kakaoLogin(body);
    return tokens;
  }

  @ApiOperation({
    description: '카카오에서 받은 인증 코드로 accessToken을 받을 수 있는 테스트 API 입니다.',
  })
  @ApiCreatedResponse(KakaoLoginResponse.created)
  @ApiUnauthorizedResponse(KakaoLoginResponse.unAuthorized)
  @Post('v2/kakao')
  async kakaoLoginTest(@Body() body: SocialLoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.kakaoLoginLocal(body);
    res.cookie('accessToken', result.access_token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.cookie('profileImg', result.user.profileImg, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.cookie('refreshToken', result.refresh_token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return res.json(result).status(200);
  }
}
