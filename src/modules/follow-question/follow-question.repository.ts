import { Question } from 'src/entities/question.entity';

export interface FollowQuestionRepository {
  findQuestion(stack: number): Promise<Question>;
}

export const FollowQuestionRepository = Symbol('FollowQuestionRepository');
