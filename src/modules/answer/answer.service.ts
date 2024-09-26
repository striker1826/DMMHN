import { Injectable } from '@nestjs/common';
import { GptService } from '../gpt/gpt.service';
import OpenAI from 'openai';
import { GradingDto } from './dto/gradingDto';

@Injectable()
export class AnswerService {
  constructor(private readonly gptService: GptService) {}

  async getMessagesData(body: { stacks: string[]; question: string; answer: string; previousQuestions: string[] }) {
    const stacksString = body.stacks.join(', ');
    // const promptStringTypeList = answerDto.map(
    //   (item) => `질문: ${item.question}. 답변: ${item.answer ? item.answer : '몰라요'}`,
    // );

    // const role: 'assistant' | 'user' = 'assistant';
    // const promptGptTypeList = promptStringTypeList.map((prompt) => {
    //   return { role, content: prompt };
    // });

    // for (let i = 0; i < promptGptTypeList.length; i++) {
    const response = await this.gptService.generateResponse({
      messages: [
        // { role: 'system', content: '' },
        {
          role: 'user',
          content:
            `keywords: ${stacksString}` +
            process.env.OPENAI_SYSTEM_TEXT +
            `이전에 했던 질문 목록: ${body.previousQuestions.join(', ')}` +
            `$$${body.question}$$` +
            `%%${body.answer ? body.answer : '몰라요'}%%`,
        },
      ],
    });

    const result = this.gptService.getChatOpenaiResponse(response);
    console.log(result);
    return result;
  }
}
