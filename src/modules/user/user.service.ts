import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(@Inject(UserRepository) private readonly userRepository: UserRepository) {}

  async getUserByUserId(userId: number) {
    const user = await this.userRepository.findUserByUserId(userId);
    return user;
  }
}
