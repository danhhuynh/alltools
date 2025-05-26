import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';

@Injectable()
export class CsvUploaderService {
  /**
   * Process a CSV file and return basic information about it
   * 
   * @param file The uploaded CSV file
   * @returns Object containing information about the processed file
   */
  async processCsvFile(file: Express.Multer.File): Promise<any> {
    try {
      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Save the file to disk
      const filename = `${Date.now()}-${file.originalname}`;
      const filepath = path.join(uploadsDir, filename);
      fs.writeFileSync(filepath, file.buffer);

      // Parse the CSV file to get basic information
      const results = [];
      let rowCount = 0;
      let columnCount = 0;

      return new Promise((resolve, reject) => {
        fs.createReadStream(filepath)
          .pipe(csv())
          .on('data', (data) => {
            // Only store the first 5 rows for preview
            if (rowCount < 5) {
              results.push(data);
            }
            
            // Update column count based on the first row
            if (rowCount === 0) {
              columnCount = Object.keys(data).length;
            }
            
            rowCount++;
          })
          .on('end', () => {
            resolve({
              success: true,
              filename: file.originalname,
              size: this.formatFileSize(file.size),
              rowCount,
              columnCount,
              preview: results,
              message: `Successfully processed CSV file with ${rowCount} rows and ${columnCount} columns.`
            });
          })
          .on('error', (error) => {
            // Clean up the file if there's an error
            if (fs.existsSync(filepath)) {
              fs.unlinkSync(filepath);
            }
            reject({
              success: false,
              message: `Error processing CSV file: ${error.message}`
            });
          });
      });
    } catch (error) {
      return {
        success: false,
        message: `Error processing CSV file: ${error.message}`
      };
    }
  }

  /**
   * Format file size in bytes to a human-readable format
   * 
   * @param bytes File size in bytes
   * @returns Formatted file size string
   */
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}