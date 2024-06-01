import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { QuestionType } from './questionType.entity';
import { Result } from './result.entity';

@Entity({ name: 'SubType' })
export class SubType {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'subTypeId',
    comment: '질문 서브 타입의 아이디',
  })
  subTypeId: number;

  @Column('varchar', { name: 'subType', comment: '질문 서브 타입' })
  subType: string;

  @Column('bigint', { name: 'questionTypeId', comment: '질문 타입의 아이디' })
  questionTypeId: number;

  @CreateDateColumn({ name: '생성 날짜' })
  createdAt: Date;

  @UpdateDateColumn({ name: '업데이트 날짜' })
  updatedAt: Date;

  @OneToMany(() => Question, (question) => question.SubType)
  Question: Question[];

  @OneToMany(() => Result, (result) => result.SubType)
  Result: Result[];

  @ManyToOne(() => QuestionType, (questionType) => questionType.SubType, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([
    { name: 'questionTypeId', referencedColumnName: 'questionTypeId' },
  ])
  QuestionType: QuestionType;
}
