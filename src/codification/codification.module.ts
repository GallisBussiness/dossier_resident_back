import { Module } from '@nestjs/common';
import { CodificationService } from './codification.service';
import { CodificationController } from './codification.controller';

@Module({
  controllers: [CodificationController],
  providers: [CodificationService],
})
export class CodificationModule {}
