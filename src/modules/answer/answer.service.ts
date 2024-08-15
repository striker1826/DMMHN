import { Injectable } from '@nestjs/common';
import { GptService } from '../gpt/gpt.service';
import OpenAI from 'openai';
import { GradingDto } from './dto/gradingDto';

@Injectable()
export class AnswerService {
  constructor(private readonly gptService: GptService) {}

  async getMessagesData(answerDto: GradingDto[]) {
    const promptStringTypeList = answerDto.map(
      (item) => `질문: ${item.question}. 답변: ${item.answer ? item.answer : '몰라요'}`,
    );

    const role: 'assistant' | 'user' = 'assistant';
    const promptGptTypeList = promptStringTypeList.map((prompt) => {
      return { role, content: prompt };
    });

    let gradingResult = [];
    for (let i = 0; i < promptGptTypeList.length; i++) {
      const response = await this.gptService.generateResponse({
        messages: [
          {
            role: 'user',
            content: process.env.OPENAI_GRADING_SYSTEM_TEXT + promptStringTypeList[i],
          },
        ],
      });

      const result = this.gptService.getChatOpenaiResponse(response);

      gradingResult.push({
        question: answerDto[i].question,
        answer: answerDto[i].answer,
        score: result.result.message.content.split(' ')[1],
      });
    }

    console.log(gradingResult);
    return gradingResult;
  }
}
