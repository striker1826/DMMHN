import { Inject, Injectable } from '@nestjs/common';
import { GptService } from '../gpt/gpt.service';
import OpenAI from 'openai';
import { AnswerRepository } from './answer.repository';

@Injectable()
export class AnswerService {
  constructor(
    private readonly gptService: GptService,
    @Inject(AnswerRepository) private readonly answerRepository: AnswerRepository,
  ) {}

  async getMessagesData(body: { stacks: string[]; question: string; answer: string; previousQuestions: string[] }) {
    const stacksString = body.stacks.join(', ');

    const response = await this.gptService.generateResponse({
      messages: [
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
    return result;
  }

  async saveUserAnswer(userId: number, question: string, answer: string) {
    await this.answerRepository.createUserAnswer(userId, question, answer);
    return;
  }
}
