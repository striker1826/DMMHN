import { Module } from '@nestjs/common';
import { GradingService } from './grading.service';
import { GradingController } from './grading.controller';
import { GptModule } from '../gpt/gpt.module';
import { AnswerModule } from '../answer/answer.module';

@Module({
  imports: [GptModule, AnswerModule],
  controllers: [GradingController],
  providers: [GradingService],
})
export class GradingModule {}
