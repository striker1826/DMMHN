export interface AnswerRepository {
  createUserAnswer(userId: number, question: string, answer: string): Promise<void>;
}

export const AnswerRepository = Symbol('AnswerRepository');
