import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { QuestionRepositroy } from './question.repository';
import { Question } from 'src/entities/question.entity';
import { shuffledArray } from 'src/utils/shuffle';

@Injectable()
export class QuestionService {
  constructor(@Inject(QuestionRepositroy) private readonly questionRepository: QuestionRepositroy) {}

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
    const result = suffledQuestions.slice(0, 2);
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
}
