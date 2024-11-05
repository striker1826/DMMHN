import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { QuestionType } from 'src/entities/questionType.entity';
import { Result } from 'src/entities/result.entity';
import { Stack } from 'src/entities/stack';
import { SubType } from 'src/entities/subType.entity';
import { User } from 'src/entities/user.entity';
import { UsersAnswer } from 'src/entities/usersAnswer';

const databaseModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: () => {
    return {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Question, SubType, QuestionType, Stack, Result, UsersAnswer],
      charset: 'utf8mb4',
      synchronize: false,
      logging: true,
    };
  },
});

@Module({
  imports: [databaseModule],
  exports: [databaseModule],
})
export class DatabaseModule {}
