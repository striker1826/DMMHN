import { Module } from '@nestjs/common';
import { FollowQuestionService } from './follow-question.service';
import { FollowQuestionController } from './follow-question.controller';
import { GptModule } from '../gpt/gpt.module';
import { FollowQuestionRepository } from './follow-question.repository';
import { FollowQuestionRepositoryImpl } from './follow-question.repositoryImpl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';

@Module({
  imports: [GptModule, TypeOrmModule.forFeature([Question])],
  controllers: [FollowQuestionController],
  providers: [FollowQuestionService, { provide: FollowQuestionRepository, useClass: FollowQuestionRepositoryImpl }],
})
export class FollowQuestionModule {}
