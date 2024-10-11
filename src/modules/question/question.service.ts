import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { QuestionRepositroy } from './question.repository';
import { Question } from 'src/entities/question.entity';
import { shuffledArray } from 'src/utils/shuffle';
import { GptService } from '../gpt/gpt.service';

@Injectable()
export class QuestionService {
  constructor(
    @Inject(QuestionRepositroy) private readonly questionRepository: QuestionRepositroy,
    private readonly gptService: GptService,
  ) {}

  async createQuestion(userId: number, question: string, subTypeId: number): Promise<void> {
    await this.questionRepository.saveQuestion(question, userId, subTypeId);
    return;
  }

  async getAllQuestionByType(subTypeId: number, userId: number): Promise<Question[]> {
    const questionList = await this.questionRepository.findAllQuestionByType(subTypeId, userId);
    return questionList;
  }

  async getQuestionListByUserId(userId: number): Promise<Question[]> {
    const questionList = await this.questionRepository.findQuestionsByUserId(userId);
    return questionList;
  }

  async getAllQuestionList(userId: number, subTypeId: number): Promise<Question[]> {
    const myQuestionList = await this.questionRepository.findAllQuestionByType(subTypeId, userId);
    const adminQuestionList = await this.questionRepository.findAllQuestionByType(subTypeId, 1);
    const questions = [...myQuestionList, ...adminQuestionList];
    const suffledQuestions = shuffledArray(questions);
    const result = suffledQuestions.slice(0, 5);
    return result;
  }

  async updateQuestionByQuestionId(userId: number, questionId: number, question: string) {
    const isUsersQuestion = await this.questionRepository.findQuestionByQuestionId(questionId, userId);
    if (!isUsersQuestion) {
      throw new UnauthorizedException('해당 게시글에 대한 수정 권한이 없습니다.');
    }

    await this.questionRepository.updateQuestionByUserId(userId, questionId, question);
    return;
  }

  async deleteQuestionByQuestionId(userId: number, questionId: number) {
    const isUsersQuestion = await this.questionRepository.findQuestionByQuestionId(questionId, userId);
    if (!isUsersQuestion) {
      throw new UnauthorizedException('해당 게시글에 대한 삭제 권한이 없습니다.');
    }

    await this.questionRepository.deleteQuestionByQuestionId(userId, questionId);
    return;
  }

  async createAiFirstQuestion(stackofString: string) {
    const stackList = stackofString.split(',');
    if (stackList.length > 3) {
      throw new BadRequestException('stack은 3개를 초과할 수 없습니다.');
    }

    const response = await this.gptService.generateResponse({
      messages: [
        {
          role: 'user',
          content: `stacks: ${stackofString}` + process.env.OPENAI_FIRST_QUESTION_PROMPT,
        },
      ],
    });

    const result = this.gptService.getChatOpenaiResponse(response);
    return result;
  }

  async getQuestionListByStacks(stacks: string) {
    const stackList = stacks.split(',');

    const questionList = await Promise.all(
      stackList.map(async (stack) => {
        return this.questionRepository.findAllQuestionByStacks(parseInt(stack));
      }),
    );

    const flattenedQuestionList = questionList.flat();
    const randomQuestionList = shuffledArray(flattenedQuestionList);
    const slicedRandomQuestionList = randomQuestionList.slice(0, 5);
    return slicedRandomQuestionList;
  }
}
