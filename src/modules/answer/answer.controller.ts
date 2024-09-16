import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { GptService } from '../gpt/gpt.service';
import { GradingDto } from './dto/gradingDto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Answer')
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService, private readonly gptService: GptService) {}

  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ description: 'GPT API을 이용해서 면접 질문과 대답 처리하기' })
  @Post('grading')
  async gradingAnswer(@Body() body: GradingDto) {
    const result = await this.answerService.getMessagesData(body);
    return result;
  }
}
