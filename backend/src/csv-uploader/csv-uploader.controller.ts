import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvUploaderService } from './csv-uploader.service';

@Controller('csv-uploader')
export class CsvUploaderController {
  constructor(private readonly csvUploaderService: CsvUploaderService) {}

  /**
   * Upload and process a CSV file
   * 
   * @param file The uploaded CSV file
   * @returns Object containing information about the processed file
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsv(@UploadedFile() file: Express.Multer.File) {
    // Check if file exists
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Check if file is a CSV
    if (!file.originalname.endsWith('.csv') && file.mimetype !== 'text/csv') {
      throw new BadRequestException('File must be a CSV');
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new BadRequestException('File size exceeds the limit (5MB)');
    }

    // Process the CSV file
    return this.csvUploaderService.processCsvFile(file);
  }
}