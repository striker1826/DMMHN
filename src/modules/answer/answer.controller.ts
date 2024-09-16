import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { GptService } from '../gpt/gpt.service';
import { GradingDto } from './dto/gradingDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService, private readonly gptService: GptService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Post('grading')
  async gradingAnswer(@Body() body: { stacks: string[]; question: string; answer: string }) {
    const result = await this.answerService.getMessagesData(body);
    return result;
  }
}
