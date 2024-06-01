import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { SubType } from './subType.entity';

@Entity({ name: 'QuestionType' })
export class QuestionType {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'questionTypeId',
    comment: '질문 타입의 아이디',
  })
  questionTypeId: number;

  @Column('varchar', { name: 'type', comment: '질문 타입' })
  type: string;

  @CreateDateColumn({ name: '생성 날짜' })
  createdAt: Date;

  @UpdateDateColumn({ name: '업데이트 날짜' })
  updatedAt: Date;

  @OneToMany(() => Question, (question) => question.QuestionType)
  Question: Question[];

  @OneToMany(() => SubType, (subType) => subType.QuestionType)
  SubType: SubType[];
}
