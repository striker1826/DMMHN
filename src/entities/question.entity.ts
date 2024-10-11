import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { SubType } from './subType.entity';
import { QuestionType } from './questionType.entity';

@Entity({ name: 'Question' })
export class Question {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'questionId',
    comment: '질문의 아이디',
  })
  questionId: number;

  @Column('varchar', { name: 'question', comment: '질문' })
  question: string;

  @Column('bigint', { name: 'userId', comment: '질문을 등록한 유저의 아이디' })
  userId: number;

  @Column('bigint', { name: 'subTypeId', comment: '질문의 서브 타입' })
  subTypeId: number;

  @Column('varchar', { name: 'speechText', comment: '질문의 발화 텍스트' })
  speechText: string;

  @Column('bigint', { name: 'questionTypeId', comment: '질문 타입의 아이디' })
  questionTypeId: number;

  @CreateDateColumn({ name: '생성 날짜' })
  createdAt: Date;

  @UpdateDateColumn({ name: '업데이트 날짜' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.Question, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'userId' }])
  User: User;

  @ManyToOne(() => SubType, (subType) => subType.Question, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'subTypeId', referencedColumnName: 'subTypeId' }])
  SubType: SubType;

  @ManyToOne(() => QuestionType, (questionType) => questionType.Question, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'questionTypeId', referencedColumnName: 'questionTypeId' }])
  QuestionType: QuestionType;
}
