import { Controller, Get, UseGuards } from '@nestjs/common';
import { StackService } from './stack.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Stack')
@Controller('stack')
export class StackController {
  constructor(private readonly stackService: StackService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('list')
  @ApiOperation({
    description: '기술 스택들을 불러오는 API 입니다.',
  })
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    schema: {
      properties: {
        stackId: { type: 'string', example: '1' },
        stack: { type: 'string', example: 'React' },
        questionTypeId: { type: 'string', example: '1' },
        QuestionType: { type: 'object', example: { type: 'FE' } },
      },
    },
  })
  @ApiUnauthorizedResponse()
  async getStackList() {
    const stackList = await this.stackService.getAllByStack();
    return stackList;
  }
}
