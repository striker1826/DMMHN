import { User } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class UserRepositoryImpl implements UserRepository {
  constructor(@InjectRepository(User) private readonly userModel: Repository<User>) {}

  async createUser(kakaoId: number, nickname: string, profileImg: string): Promise<User> {
    const newUser = this.userModel.create();
    newUser.kakaoId = kakaoId;
    newUser.nickname = nickname;
    newUser.profileImg = profileImg;

    const createdUser = await this.userModel.save(newUser);
    return createdUser;
  }

  async findUserByKakaoId(kakaoId: number): Promise<User> {
    const user = await this.userModel.findOne({ where: { kakaoId } });
    return user;
  }

  async findUserByUserId(userId: number): Promise<User> {
    const user = await this.userModel.findOne({ where: { userId } });
    return user;
  }

  async saveEmail(userId: number, email: string): Promise<void> {
    await this.userModel.update({ userId }, { email });
    return;
  }
}
