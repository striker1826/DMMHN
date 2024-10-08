import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  private openAiService: OpenAI;

  constructor() {
    this.openAiService = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  // gptAi로 질문 생성
  async generateResponse(prompt: {
    messages: { role: 'user' | 'system'; content: string }[];
  }): Promise<OpenAI.ChatCompletion> {
    return await this.openAiService.chat.completions.create({
      model: 'gpt-4o',
      messages: prompt.messages,
      temperature: 0.5,
      max_tokens: 256,
      top_p: 0.5,
      frequency_penalty: 0,
      presence_penalty: 0,
      response_format: {
        type: 'text',
      },
    });
  }

  // gpt로부터 받은 response 일관된 형식으로 포맷팅
  getChatOpenaiResponse(message: OpenAI.ChatCompletion): {
    success: boolean;
    result: OpenAI.ChatCompletion.Choice;
  } {
    return {
      success: true,
      result: message?.choices?.length && message?.choices[0],
    };
  }
}
