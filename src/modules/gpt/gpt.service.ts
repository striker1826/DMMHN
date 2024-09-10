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

  async generateResponse(prompt: {
    messages: { role: 'user' | 'system'; content: string }[];
  }): Promise<OpenAI.ChatCompletion> {
    console.log(prompt);
    return await this.openAiService.chat.completions.create({
      model: 'gpt-4o',
      messages: prompt.messages,
      temperature: 0,
      max_tokens: 256,
      top_p: 0.5,
      frequency_penalty: 0,
      presence_penalty: 0,
      response_format: {
        type: 'text',
      },
    });
  }

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
