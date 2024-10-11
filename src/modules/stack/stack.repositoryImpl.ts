import { InjectRepository } from '@nestjs/typeorm';
import { StackRepository } from './stack.repository';
import { Stack } from 'src/entities/stack';
import { Repository } from 'typeorm';
import { QuestionType } from 'src/entities/questionType.entity';

export class StackRepositoryImpl implements StackRepository {
  constructor(@InjectRepository(QuestionType) private readonly questionTypeModel: Repository<QuestionType>) {}

  async findAllByStack() {
    const stackList = await this.questionTypeModel
      .createQueryBuilder('qt')
      .select(['qt.questionTypeId', 'qt.type'])
      .getMany();

    return stackList;
  }
}
