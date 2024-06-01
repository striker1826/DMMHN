import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { User } from 'src/common/decorators/user-decorator';
import { Question } from './dto/input/question.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateQuestion } from 'src/common/swagger/question/createQuestion';
import { UpdateQuestion } from './dto/input/updateQuestion.dto';
import { SubTypeDto } from './dto/input/subtype.dto';
import { QuestionListBySubTypeId } from './dto/output/questionListBySubTypeId.dto';
import { QuestionIdDto } from './dto/input/questionId.dto';

@ApiTags('Question')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiOperation({
    description: '커스텀 질문을 등록할 수 있는 API 입니다.',
  })
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse(CreateQuestion.created)
  @ApiUnauthorizedResponse(CreateQuestion.unAuthorized)
  @ApiBadRequestResponse(CreateQuestion.badRequest)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createQuestion(@User() user: number, @Body() body: Question) {
    await this.questionService.createQuestion(user, body.question, body.subTypeId);
    return;
  }

  @ApiOperation({
    description: '세부 유형의 아이디로 질문 리스트를 가져오는 API 입니다.',
  })
  @ApiBearerAuth('access-token')
  @ApiOkResponse()
  @ApiUnauthorizedResponse()
  @ApiBadRequestResponse()
  @UseGuards(AuthGuard('jwt'))
  @Get('/subtype')
  async getQuestionBySubType(@User() user: number, @Query() query: SubTypeDto): Promise<QuestionListBySubTypeId[]> {
    const questionList = await this.questionService.getAllQuestionByType(query.subtype_id, user);
    return questionList;
  }

  @ApiOperation({
    description: '유저가 등록한 질문 리스트를 가져오는 API 입니다.',
  })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiUnauthorizedResponse()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @Get('myquestion')
  async getQuestionByUserId(@User() user: number) {
    const questionList = await this.questionService.getQuestionListByUserId(user);
    return questionList;
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @Patch('myquestion/:questionId')
  async updateQuestionByQuestionId(@User() user: number, @Param() params: QuestionIdDto, @Body() body: UpdateQuestion) {
    await this.questionService.updateQuestionByQuestionId(user, params.question_id, body.question);
    return;
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @Delete('myquestion/:questionId')
  async deleteQuestionByQuestionId(@User() user: number, @Param() params: QuestionIdDto) {
    await this.questionService.deleteQuestionByQuestionId(user, params.question_id);
    return;
  }
}
