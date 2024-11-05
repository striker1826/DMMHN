import { BadRequestException, Body, Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FollowQuestionService } from './follow-question.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { getFirstQuestion } from 'src/common/swagger/follow-question/getFirstQuestion';
import { AuthGuard } from '@nestjs/passport';
import { GptService } from '../gpt/gpt.service';
import { InterviewHistory } from './dto/interview-history';

@Controller('follow-question')
export class FollowQuestionController {
  constructor(private readonly followQuestionService: FollowQuestionService, private readonly gptService: GptService) {}

  @ApiOperation({
    description: '꼬리 질문 면접 시 첫 질문을 불러오는 API',
  })
  @ApiBearerAuth('access-token')
  @ApiOkResponse(getFirstQuestion.ok)
  @ApiUnauthorizedResponse(getFirstQuestion.unAuthorized)
  @ApiBadRequestResponse(getFirstQuestion.badRequest)
  @UseGuards(AuthGuard('jwt'))
  @Get('first-question')
  async firstQuestion(@Query('stack') stack: string) {
    const firstQuestion = await this.followQuestionService.getQuestion(stack);
    return { role: 'assistant', content: firstQuestion };
  }

  @ApiOperation({
    description: '꼬리 질문 면접 시 첫 질문을 불러오는 API',
  })
  @ApiBearerAuth('access-token')
  @ApiOkResponse(getFirstQuestion.ok)
  @ApiUnauthorizedResponse(getFirstQuestion.unAuthorized)
  @ApiBadRequestResponse(getFirstQuestion.badRequest)
  @UseGuards(AuthGuard('jwt'))
  @Get('')
  async followQuestion(@Query('stack') stack: string, @Body() interviewHistory: InterviewHistory[]) {
    const gptResponse = await this.gptService.generateResponse({
      messages: [
        { role: 'system', content: process.env.OPENAI_FLLOW_QUESTION + `기술 스택: ${stack}` },
        ...interviewHistory,
      ],
    });

    const gptResponseFormat = this.gptService.getChatOpenaiResponse(gptResponse);
    const gptMessage = gptResponseFormat.result.message.content;

    const result = [...interviewHistory, { role: 'assistant', content: gptMessage }];
    return result;
  }
}
