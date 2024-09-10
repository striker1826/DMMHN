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

@Entity({ name: 'Stack' })
export class Stack {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'stackId', comment: 'primaryKey' })
  stackId: number;

  @Column('varchar', { name: 'stack', comment: '기술 스택' })
  stack: string;

  @Column('bigint', { name: 'questionTypeId', comment: 'stack이 속해있는 category' })
  questionTypeId: number;

  @CreateDateColumn({ name: '생성 날짜' })
  createdAt: Date;

  @UpdateDateColumn({ name: '업데이트 날짜' })
  updatedAt: Date;

  @ManyToOne(() => QuestionType, (questionType) => questionType.Stack, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'questionTypeId', referencedColumnName: 'questionTypeId' }])
  QuestionType: QuestionType;
}
