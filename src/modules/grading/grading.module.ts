import { Module } from '@nestjs/common';
import { GradingService } from './grading.service';
import { GradingController } from './grading.controller';
import { GptModule } from '../gpt/gpt.module';

@Module({
  imports: [GptModule],
  controllers: [GradingController],
  providers: [GradingService],
})
export class GradingModule {}
