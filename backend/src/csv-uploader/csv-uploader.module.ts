import { Module } from '@nestjs/common';
import { CsvUploaderController } from './csv-uploader.controller';
import { CsvUploaderService } from './csv-uploader.service';

@Module({
  controllers: [CsvUploaderController],
  providers: [CsvUploaderService],
})
export class CsvUploaderModule {}