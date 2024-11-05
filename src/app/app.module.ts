import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from 'src/modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { QuestionModule } from 'src/modules/question/question.module';
import { AnswerModule } from 'src/modules/answer/answer.module';
import { GptModule } from 'src/modules/gpt/gpt.module';
import { StackModule } from 'src/modules/stack/stack.module';
import { GradingModule } from 'src/modules/grading/grading.module';
import { FollowQuestionModule } from 'src/modules/follow-question/follow-question.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UserModule,
    QuestionModule,
    AnswerModule,
    GptModule,
    StackModule,
    GradingModule,
    FollowQuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
