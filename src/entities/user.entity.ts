import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Question } from './question.entity';
import { Result } from './result.entity';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'userId',
    comment: '유저의 아이디',
  })
  userId: number;

  @Column('bigint', { name: 'kakaoId', comment: '유저의 카카오 식별자' })
  kakaoId: number;

  @Column('varchar', { name: 'email', comment: '유저의 이메일', nullable: true })
  email: string;

  @Column('varchar', { name: 'nickname', comment: '유저의 이름' })
  nickname: string;

  @Column('varchar', { name: 'profileImg', comment: '유저의 프로필 이미지' })
  profileImg: string;

  @CreateDateColumn({ name: '생성 날짜' })
  createdAt: Date;

  @UpdateDateColumn({ name: '업데이트 날짜' })
  updatedAt: Date;

  @OneToMany(() => Question, (question) => question.User)
  Question: Question[];

  @OneToMany(() => Result, (result) => result.User)
  Result: Result[];
}
