import { Inject, Injectable } from '@nestjs/common';
import { StackRepository } from './stack.repository';

@Injectable()
export class StackService {
  constructor(@Inject(StackRepository) private readonly stackRepository: StackRepository) {}

  async getAllByStack() {
    const stackList = await this.stackRepository.findAllByStack();
    return stackList;
  }
}
