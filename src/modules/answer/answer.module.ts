import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { GptModule } from '../gpt/gpt.module';
import { GptService } from '../gpt/gpt.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    GptModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // 파일이 저장될 경로
        filename: (req, file, cb) => {
          cb(null, file.originalname); // 원본 파일 이름으로 저장
        },
      }),
    }),
  ],
  controllers: [AnswerController],
  providers: [AnswerService, GptService],
})
export class AnswerModule {}
