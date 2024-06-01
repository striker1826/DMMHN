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

@Entity({ name: 'Result' })
export class Result {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'resultId',
    comment: '면접 결과 아이디',
  })
  reusltId: number;

  @Column('varchar', {
    name: 'resultText',
    comment: '텍스트로 변환한 면접 내용',
  })
  resultText: string;

  @Column('timestamp', { name: 'totalTime', comment: '면접을 진행한 총 시간' })
  totalTime: Date;

  @Column('bigint', { name: 'userId', comment: '면접을 본 유저의 아이디' })
  userId: number;

  @Column('bigint', { name: 'subTypeId', comment: '진행한 면접의 서브타입' })
  subTypeId: number;

  @CreateDateColumn({ name: '생성 날짜' })
  createdAt: Date;

  @UpdateDateColumn({ name: '업데이트 날짜' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.Result, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'userId' }])
  User: User;

  @ManyToOne(() => SubType, (subType) => subType.Result, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'subTypeId', referencedColumnName: 'subTypeId' }])
  SubType: SubType;
}
