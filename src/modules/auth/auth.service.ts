import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { SocialLoginDto } from './dto/input/social-login.dto';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'; // ! Don't forget this import

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async kakaoLogin({ code }: SocialLoginDto): Promise<{ access_token: string; refresh_token: string }> {
    try {
      const kakaoTokenRes = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        {
          grant_type: 'authorization_code',
          client_id: process.env.KAKAO_CLIENT_ID,
          redirect_uri: process.env.KAKAO_REDIRECT_URI,
          client_secret: process.env.KAKAO_SECRET_KEY,
          code,
        },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } },
      );

      const kakaoToken = kakaoTokenRes.data.access_token;

      const kakaoUserRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          Authorization: `Bearer ${kakaoToken}`,
        },
      });
      let user = await this.userRepository.findUserByKakaoId(kakaoUserRes.data.id);
      if (!user) {
        user = await this.userRepository.createUser(
          kakaoUserRes.data.id,
          kakaoUserRes.data.properties.nickname,
          kakaoUserRes.data.properties.profile_image,
        );
      }

      const access_token = this.generateJwt(user.userId, 'ACCESS_TOKEN');
      const refresh_token = this.generateJwt(user.userId, 'REFRESH_TOKEN');

      return { access_token, refresh_token };
    } catch (err) {
      throw new UnauthorizedException('올바른 인증코드가 아닙니다.');
    }
  }

  generateJwt(userId: number, key: 'ACCESS_TOKEN' | 'REFRESH_TOKEN') {
    let token: string;

    if (key === 'ACCESS_TOKEN') {
      token = this.jwtService.sign({ userId }, { secret: process.env.ACCESS_TOKEN_KEY, expiresIn: '24h' });
    } else if (key === 'REFRESH_TOKEN') {
      token = this.jwtService.sign({ userId }, { secret: process.env.REFRESH_TOKEN_KEY, expiresIn: '7d' });
    }

    return token;
  }

  async kakaoLoginLocal({ code, context }: SocialLoginDto): Promise<{
    access_token: string;
    refresh_token: string;
    user: { profileImg: string };
    isEmail: boolean;
  }> {
    console.log('context', context);
    try {
      const kakaoTokenRes = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        {
          grant_type: 'authorization_code',
          client_id: process.env.KAKAO_CLIENT_ID,
          redirect_uri: context,
          client_secret: process.env.KAKAO_SECRET_KEY,
          code,
        },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } },
      );

      const kakaoToken = kakaoTokenRes.data.access_token;

      const kakaoUserRes = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          Authorization: `Bearer ${kakaoToken}`,
        },
      });
      let user = await this.userRepository.findUserByKakaoId(kakaoUserRes.data.id);
      if (!user) {
        user = await this.userRepository.createUser(
          kakaoUserRes.data.id,
          kakaoUserRes.data.properties.nickname,
          kakaoUserRes.data.properties.profile_image,
        );
      }

      const access_token = this.generateJwt(user.userId, 'ACCESS_TOKEN');
      const refresh_token = this.generateJwt(user.userId, 'REFRESH_TOKEN');

      const isEmail = !!user.email;

      return { access_token, refresh_token, user: { profileImg: user.profileImg }, isEmail };
    } catch (err) {
      throw new UnauthorizedException('올바른 인증코드가 아닙니다.');
    }
  }

  async confirmCode(email: string, request_code: string) {
    const authCode = await this.cacheManager.get(email);
    if (authCode !== request_code) {
      throw new BadRequestException('인증번호가 올바르지 않습니다.');
    }

    await this.cacheManager.del(email);
    await this.cacheManager.set(email + request_code, true);
    return;
  }
}
