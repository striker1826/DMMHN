import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { FollowQuestionRepository } from './follow-question.repository';

@Injectable()
export class FollowQuestionService {
  constructor(@Inject(FollowQuestionRepository) private readonly followQuestionRepository: FollowQuestionRepository) {}

  async getQuestion(stack: string) {
    const stackList = stack.split(',');
    if (stackList.length > 3) {
      throw new BadRequestException('stack은 3개를 초과할 수 없습니다.');
    }

    const question = await this.followQuestionRepository.findQuestion(Number(stack[0]));
    return question;
  }
}
