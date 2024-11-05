import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { Repository } from 'typeorm';
import { FollowQuestionRepository } from './follow-question.repository';

export class FollowQuestionRepositoryImpl implements FollowQuestionRepository {
  constructor(@InjectRepository(Question) private readonly questionModel: Repository<Question>) {}

  async findQuestion(stack: number): Promise<Question> {
    const question = await this.questionModel
      .createQueryBuilder('question')
      .where('question.questionTypeId = :stack', { stack })
      .orderBy('RAND()') // 무작위 정렬
      .limit(1) // 하나의 결과만 가져오기
      .getOne();

    return question;
  }
}
