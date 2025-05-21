import { Injectable } from '@nestjs/common';

@Injectable()
export class CharacterCounterService {
  /**
   * Counts the number of characters in a string
   * 
   * @param text The string to count characters in
   * @returns An object containing the total character count and detailed information
   */
  countCharacters(text: string): { 
    totalCount: number;
    withoutSpaces: number;
    alphabetic: number;
    numeric: number;
    special: number;
    uppercase: number;
    lowercase: number;
  } {
    if (!text) {
      return {
        totalCount: 0,
        withoutSpaces: 0,
        alphabetic: 0,
        numeric: 0,
        special: 0,
        uppercase: 0,
        lowercase: 0,
      };
    }

    const totalCount = text.length;
    const withoutSpaces = text.replace(/\s/g, '').length;
    const alphabetic = (text.match(/[a-zA-Z]/g) || []).length;
    const numeric = (text.match(/[0-9]/g) || []).length;
    const uppercase = (text.match(/[A-Z]/g) || []).length;
    const lowercase = (text.match(/[a-z]/g) || []).length;
    const special = withoutSpaces - alphabetic - numeric;

    return {
      totalCount,
      withoutSpaces,
      alphabetic,
      numeric,
      special,
      uppercase,
      lowercase,
    };
  }
}