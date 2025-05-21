import { Module } from '@nestjs/common';
import { CharacterCounterController } from './character-counter.controller';
import { CharacterCounterService } from './character-counter.service';

@Module({
  controllers: [CharacterCounterController],
  providers: [CharacterCounterService],
  exports: [CharacterCounterService],
})
export class CharacterCounterModule {}