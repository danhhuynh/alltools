import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdGeneratorModule } from './id-generator/id-generator.module';
import { CharacterCounterModule } from './character-counter/character-counter.module';

@Module({
  imports: [IdGeneratorModule, CharacterCounterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
