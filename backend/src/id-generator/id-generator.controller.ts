import { Controller, Get, Query } from '@nestjs/common';
import { IdGeneratorService } from './id-generator.service';

@Controller('api/id-generator')
export class IdGeneratorController {
  constructor(private readonly idGeneratorService: IdGeneratorService) {}

  /**
   * Generates a unique ID using timestamp and random characters
   * 
   * @param prefix Optional prefix to add to the ID
   * @returns Object containing the generated unique ID
   */
  @Get('unique')
  generateUniqueId(@Query('prefix') prefix?: string): { id: string } {
    return { id: this.idGeneratorService.generateUniqueId(prefix) };
  }

  /**
   * Generates a shorter unique ID
   * 
   * @param prefix Optional prefix to add to the ID
   * @returns Object containing the generated short unique ID
   */
  @Get('short')
  generateShortUniqueId(@Query('prefix') prefix?: string): { id: string } {
    return { id: this.idGeneratorService.generateShortUniqueId(prefix) };
  }

  /**
   * Generates a standard UUID v4
   * 
   * @returns Object containing the generated UUID
   */
  @Get('uuid')
  generateUuidV4(): { id: string } {
    return { id: this.idGeneratorService.generateUuidV4() };
  }
}