import { InjectRepository } from '@nestjs/typeorm';
import { QuestionRepositroy } from './question.repository';
import { Question } from 'src/entities/question.entity';
import { Repository } from 'typeorm';

export class QuestionRepositoryImpl implements QuestionRepositroy {
  constructor(@InjectRepository(Question) private readonly questionModel: Repository<Question>) {}

  // Save
  async saveQuestion(question: string, userId: number, subTypeId: number): Promise<void> {
    const newQuestion = this.questionModel.create();
    newQuestion.question = question;
    newQuestion.userId = userId;
    newQuestion.subTypeId = subTypeId;
    await this.questionModel.save(newQuestion);
    return;
  }

  // Find
  async findAllQuestionByType(subTypeId: number, userId: number): Promise<Question[]> {
    const questionList = await this.questionModel.find({ where: { subTypeId, userId } });
    return questionList;
  }

  async findQuestionsByUserId(userId: number): Promise<Question[]> {
    const questionList = await this.questionModel.find({ where: { userId } });
    return questionList;
  }

  async findQuestionByQuestionId(questionId: number, userId: number): Promise<Question> {
    const question = await this.questionModel.findOne({ where: { questionId, userId } });
    return question;
  }

  // Update
  async updateQuestionByUserId(userId: number, questionId: number, question: string): Promise<void> {
    await this.questionModel.update({ userId, questionId }, { question });
    return;
  }

  // Delete
  async deleteQuestionByQuestionId(userId: number, questionId: number): Promise<void> {
    await this.questionModel.delete({ userId, questionId });
    return;
  }
}
