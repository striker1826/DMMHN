import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'; // ! Don't forget this import

@Injectable()
export class UserService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async getUserByUserId(userId: number) {
    const user = await this.userRepository.findUserByUserId(userId);
    return user;
  }

  async saveEmail(userId: number, email: string, code: string) {
    const validate = await this.cacheManager.get(email + code);
    if (!validate) {
      throw new BadRequestException('인증을 먼저 진행해주세요.');
    }

    await this.userRepository.saveEmail(userId, email);
    return;
  }
}
