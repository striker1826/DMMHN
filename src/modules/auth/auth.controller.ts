import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SocialLoginDto } from './dto/input/social-login.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { KakaoLoginResponse } from 'src/common/swagger/auth/kakaoLogin';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { MailService } from '../mail/mail.service';
import { SendEmailDto } from './dto/input/send-email.dto';
import { ConfirmEmailDto } from './dto/input/confirm-email.dto';
import { User } from 'src/common/decorators/user-decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly mailService: MailService) {}

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
    console.log('result', result);
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

  @ApiOperation({
    description: '이메일 인증번호 발송 API',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse()
  @ApiUnauthorizedResponse()
  @Post('send/authcode')
  async sendAuthCode(@Body() body: SendEmailDto) {
    await this.mailService.sendAuthCode(body.email);
    return;
  }

  @ApiOperation({
    description: '이메일 인증 API',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse()
  @ApiUnauthorizedResponse()
  @Post('confirm/authcode')
  async confirmAuthCode(@Body() body: ConfirmEmailDto) {
    const result = await this.authService.confirmCode(body.email, body.code);
    return result;
  }

  @ApiOperation({
    description: '로그인 여부 확인',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiUnauthorizedResponse()
  @Post('login/check')
  async isLoginCheck(@User() userId: number) {
    console.log(userId);
    return { result: true };
  }
}
