import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { EvaluationInputDto } from './dto/input/evaluation.dto';
import { GptService } from '../gpt/gpt.service';
import { OverallRatingInputDto } from './dto/input/overallRating.dto';
import { GradingService } from './grading.service';
import { AuthGuard } from '@nestjs/passport';
import { AnswerService } from '../answer/answer.service';
import { User } from 'src/common/decorators/user-decorator';

@Controller('grading')
export class GradingController {
  constructor(
    private readonly gradingService: GradingService,
    private readonly gptService: GptService,
    private readonly answerService: AnswerService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ description: 'GPT API에게 답변의 평가를 요청하는 API' })
  @Post('evaluation')
  async evaluationByAnswer(@User() userId: number, @Body() evaluationDto: EvaluationInputDto[]) {
    const result = await Promise.all(
      evaluationDto.map(async (evaluation) => {
        await this.answerService.saveUserAnswer(userId, evaluation.question, evaluation.answer);
        const gptResponse = await this.gptService.generateResponse({
          messages: [
            {
              role: 'user',
              content: `${process.env.OPENAI_GRADING_EVALUATION_PROMPT} 질문: ${evaluation.question}, 답변: ${evaluation.answer}`,
            },
          ],
        });

        const gptResponseFormat = this.gptService.getChatOpenaiResponse(gptResponse);

        return gptResponseFormat.result.message.content;
      }),
    );
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
