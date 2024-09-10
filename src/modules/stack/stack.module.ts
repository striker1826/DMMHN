import { Module } from '@nestjs/common';
import { StackService } from './stack.service';
import { StackController } from './stack.controller';
import { StackRepository } from './stack.repository';
import { StackRepositoryImpl } from './stack.repositoryImpl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stack } from 'src/entities/stack';

@Module({
  imports: [TypeOrmModule.forFeature([Stack])],
  controllers: [StackController],
  providers: [StackService, { provide: StackRepository, useClass: StackRepositoryImpl }],
})
export class StackModule {}
