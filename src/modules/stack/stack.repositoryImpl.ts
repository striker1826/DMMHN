import { InjectRepository } from '@nestjs/typeorm';
import { StackRepository } from './stack.repository';
import { Stack } from 'src/entities/stack';
import { Repository } from 'typeorm';

export class StackRepositoryImpl implements StackRepository {
  constructor(@InjectRepository(Stack) private readonly stackModel: Repository<Stack>) {}

  async findAllByStack() {
    const stackList = await this.stackModel
      .createQueryBuilder('s')
      .leftJoin('s.QuestionType', 'qt')
      .select(['s.stackId', 's.stack', 's.questionTypeId', 'qt.type'])
      .getMany();

    return stackList;
  }
}
