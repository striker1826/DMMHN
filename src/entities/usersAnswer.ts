import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QuestionType } from './questionType.entity';

@Entity({ name: 'UsersAnswer' })
export class UsersAnswer {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'users_answer_id', comment: 'primaryKey' })
  users_answer_id: number;

  @Column('varchar', { name: 'question', comment: '유저가 답변한 질문' })
  question: string;

  @Column('bigint', { name: 'userId', comment: '답변한 유저의 아이디' })
  userId: number;

  @Column('varchar', { name: 'answer', comment: '유저가 답변한 내용' })
  answer: string;

  @CreateDateColumn({ name: '생성 날짜' })
  createdAt: Date;

  @UpdateDateColumn({ name: '업데이트 날짜' })
  updatedAt: Date;
}
