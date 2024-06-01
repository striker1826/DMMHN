import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserRepositoryImpl } from './user.repositoryImpl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, { provide: UserRepository, useClass: UserRepositoryImpl }],
  exports: [UserRepository],
})
export class UserModule {}
