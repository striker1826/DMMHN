import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { GptService } from '../gpt/gpt.service';
import { GradingDto } from './dto/gradingDto';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Answer')
@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService, private readonly gptService: GptService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ description: 'GPT API을 이용해서 면접 질문과 대답 처리하기' })
  @Post('grading')
  async gradingAnswer(@Body() body: GradingDto) {
    const result = await this.answerService.getMessagesData(body);
    return result;
  }

  @ApiOperation({ description: 'GPT API를 이용한 STT 기능' })
  @UseGuards(AuthGuard('jwt'))
  @Post('stt')
  @UseInterceptors(FileInterceptor('audioFile'))
  async generateStt(@UploadedFile() audioFile: Express.Multer.File) {
    const result = await this.gptService.stt(audioFile.path);
    return result;
  }
}
