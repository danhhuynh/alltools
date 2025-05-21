import { Module } from '@nestjs/common';
import { IdGeneratorController } from './id-generator.controller';
import { IdGeneratorService } from './id-generator.service';

@Module({
  controllers: [IdGeneratorController],
  providers: [IdGeneratorService],
  exports: [IdGeneratorService],
})
export class IdGeneratorModule {}