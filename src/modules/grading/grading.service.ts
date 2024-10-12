import { Injectable } from '@nestjs/common';
import { GptService } from '../gpt/gpt.service';
import { OverallRatingInputDto } from './dto/input/overallRating.dto';

@Injectable()
export class GradingService {
  constructor(private readonly gptService: GptService) {}

  async generateOverallRating(evaluationList: OverallRatingInputDto[]) {
    const evaluationListToString = evaluationList.map((obj) => obj.evaluation).join(' ');
    const overallRatingFromGpt = await this.gptService.generateResponse({
      messages: [
        {
          role: 'user',
          content: `${process.env.OPENAI_GRADING_OVERALL_PROMPT} #${evaluationListToString}#`,
        },
      ],
    });

    const overallRatingFormatting = this.gptService.getChatOpenaiResponse(overallRatingFromGpt);
    const overallRating = overallRatingFormatting.result.message.content;
    return { overallRating };
  }
}
