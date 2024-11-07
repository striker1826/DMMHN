import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'; // ! Don't forget this import
import * as nodemailer from 'nodemailer';
import { generateRandomCode } from 'src/utils/random';

@Injectable()
export class MailService {
  private transporter;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    this.transporter = nodemailer.createTransport({
      // SMTP 설정
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendAuthCode(to: string): Promise<void> {
    try {
      const randomString = generateRandomCode(); // 인증 코드 생성

      // 이메일 전송
      await this.transporter.sendMail({
        to,
        from: '떨면뭐하니 <minseob1826@gmail.com>',
        subject: '떨면뭐하니에서 인증번호를 보내드립니다.',
        html: `<b>떨면뭐하니의 이메일 인증 번호를 보내드립니다. <br/><br/> <p style="font-size:36px; font-weight:700;">${randomString}</p></b>`,
      });

      console.log(`${to} 주소로 메일이 전송되었습니다.`);

      const THREE_MINUTES = 180000;
      await this.cacheManager.set(to, randomString, THREE_MINUTES);

      console.log(`인증 코드가 저장되었습니다: to: ${to} code: ${randomString}`);
    } catch (err) {
      console.log('메일 전송 중 에러 발생:', err);
      throw new Error('메일 전송 실패');
    }
  }
}
