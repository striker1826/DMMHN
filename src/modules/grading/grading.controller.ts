import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { EvaluationInputDto } from './dto/input/evaluation.dto';
import { GptService } from '../gpt/gpt.service';

@Controller('grading')
export class GradingController {
  constructor(private readonly gptService: GptService) {}

  @ApiOperation({ description: 'GPT API에게 답변의 평가를 요청하는 API' })
  @Post('evaluation')
  async evaluationByAnswer(@Body() evaluationDto: EvaluationInputDto) {
    const gptResponse = await this.gptService.generateResponse({
      messages: [
        {
          role: 'user',
          content: `${process.env.OPENAI_GRADING_EVALUATION_PROMPT} 질문: ${evaluationDto.question}, 답변: ${evaluationDto.answer}`,
        },
      ],
    });

    const result = this.gptService.getChatOpenaiResponse(gptResponse);
    return result;
  }
}
