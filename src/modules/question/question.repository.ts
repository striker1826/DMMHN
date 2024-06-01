import { Question } from 'src/entities/question.entity';

export interface QuestionRepositroy {
  saveQuestion(question: string, userId: number, subTypeId: number): Promise<void>;
  findAllQuestionByType(subTypeId: number, userId: number): Promise<Question[]>;
  findQuestionsByUserId(userId: number): Promise<Question[]>;
  findQuestionByQuestionId(questionId: number, userId: number): Promise<Question>;
  updateQuestionByUserId(userId: number, questionId: number, question: string): Promise<void>;
  deleteQuestionByQuestionId(userId: number, questionId: number): Promise<void>;
}

export const QuestionRepositroy = Symbol('QuestionRepository');
