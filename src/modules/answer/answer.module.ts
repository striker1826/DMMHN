import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { GptModule } from '../gpt/gpt.module';
import { GptService } from '../gpt/gpt.service';

@Module({
  imports: [GptModule],
  controllers: [AnswerController],
  providers: [AnswerService, GptService],
})
export class AnswerModule {}
