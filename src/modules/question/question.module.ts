import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { QuestionRepositroy } from './question.repository';
import { QuestionRepositoryImpl } from './question.repositoryImpl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { GptModule } from '../gpt/gpt.module';
import { GptService } from '../gpt/gpt.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), GptModule],
  controllers: [QuestionController],
  providers: [QuestionService, { provide: QuestionRepositroy, useClass: QuestionRepositoryImpl }, GptService],
})
export class QuestionModule {}
