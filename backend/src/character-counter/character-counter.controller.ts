import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CharacterCounterService } from './character-counter.service';

@Controller('api/character-counter')
export class CharacterCounterController {
  constructor(private readonly characterCounterService: CharacterCounterService) {}

  /**
   * Counts the number of characters in a string provided as a query parameter
   * 
   * @param text The string to count characters in
   * @returns Object containing character count information
   */
  @Get('count')
  countCharactersGet(@Query('text') text: string) {
    return this.characterCounterService.countCharacters(text || '');
  }

  /**
   * Counts the number of characters in a string provided in the request body
   * Useful for longer strings that might not be suitable for query parameters
   * 
   * @param body Object containing the text to analyze
   * @returns Object containing character count information
   */
  @Post('count')
  countCharactersPost(@Body() body: { text: string }) {
    return this.characterCounterService.countCharacters(body.text || '');
  }
}