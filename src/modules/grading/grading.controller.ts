import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { EvaluationInputDto } from './dto/input/evaluation.dto';
import { GptService } from '../gpt/gpt.service';
import { OverallRatingInputDto } from './dto/input/overallRating.dto';
import { GradingService } from './grading.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('grading')
export class GradingController {
  constructor(private readonly gradingService: GradingService, private readonly gptService: GptService) {}

  @ApiOperation({ description: 'GPT API에게 답변의 평가를 요청하는 API' })
  @Post('evaluation')
  async evaluationByAnswer(@Body() evaluationDto: EvaluationInputDto[]) {
    let result = [];
    for (let i = 0; i < evaluationDto.length; i++) {
      const gptResponse = await this.gptService.generateResponse({
        messages: [
          {
            role: 'user',
            content: `${process.env.OPENAI_GRADING_EVALUATION_PROMPT} 질문: ${evaluationDto[i].question}, 답변: ${evaluationDto[i].answer}`,
          },
        ],
      });
      const gptResponseFormat = this.gptService.getChatOpenaiResponse(gptResponse);
      const resultToJson = JSON.parse(gptResponseFormat.result.message.content);
      result.push(resultToJson);
    }
    return result;
  }

  @ApiOperation({ description: 'GPT API에게 면접의 전체적인 평가를 요청하는 API' })
  @UseGuards(AuthGuard('jwt'))
  @Post('evaluation/overall')
  async overallRating(@Body() evaluationList: OverallRatingInputDto[]) {
    const overallRating = await this.gradingService.generateOverallRating(evaluationList);
    return overallRating;
  }
}
