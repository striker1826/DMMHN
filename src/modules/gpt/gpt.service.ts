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
      model: 'gpt-4',
      messages: prompt.messages,
      top_p: 1,
      temperature: 0,
      max_tokens: 200,
    });
    // const data = {
    //   system:
    //     '너는 이제부터 IT 기업의 기술 면접관이야. 지원자에게 질문을 하고, 지원자의 답변을 평가해서 점수를 매기고 해당 점수가 나온 이유를 같이 알려줘',
    //   prompt: prompt,
    //   max_tokens: 150,
    //   n: 1,
    //   stop: null,
    //   temperature: 1,
    // };

    // const headers = {
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${this.apiKey}`,
    // };

    // const answer = await axios.post(this.apiUrl, data, { headers: headers });
    // console.log(answer);
    // return answer;
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
