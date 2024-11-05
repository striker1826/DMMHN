import { InjectRepository } from '@nestjs/typeorm';
import { AnswerRepository } from './answer.repository';
import { UsersAnswer } from 'src/entities/usersAnswer';
import { Repository } from 'typeorm';

export class AnswerRepositoryImpl implements AnswerRepository {
  constructor(@InjectRepository(UsersAnswer) private readonly usersAnswerModel: Repository<UsersAnswer>) {}

  async createUserAnswer(userId: number, question: string, answer: string): Promise<void> {
    const newUserAnswer = this.usersAnswerModel.create();
    newUserAnswer.userId = userId;
    newUserAnswer.question = question;
    newUserAnswer.answer = answer;

    await this.usersAnswerModel.save(newUserAnswer);

    return;
  }
}
