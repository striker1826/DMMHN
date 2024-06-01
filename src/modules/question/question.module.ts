import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { QuestionRepositroy } from './question.repository';
import { QuestionRepositoryImpl } from './question.repositoryImpl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  controllers: [QuestionController],
  providers: [QuestionService, { provide: QuestionRepositroy, useClass: QuestionRepositoryImpl }],
})
export class QuestionModule {}
