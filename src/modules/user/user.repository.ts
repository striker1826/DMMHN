import { User } from 'src/entities/user.entity';

export interface UserRepository {
  createUser(kakaoId: number, nickname: string, profileImg: string): Promise<User>;
  findUserByKakaoId(kakaoId: number): Promise<User>;
  findUserByUserId(userId: number): Promise<User>;
  saveEmail(userId: number, email: string): Promise<void>;
}

export const UserRepository = Symbol('UserRepository');
