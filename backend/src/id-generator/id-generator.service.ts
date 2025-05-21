import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class IdGeneratorService {
  /**
   * Generates a unique ID using a combination of timestamp and random characters.
   * 
   * The algorithm uses:
   * 1. Current timestamp in milliseconds (high precision)
   * 2. Random bytes converted to a base64 string (for entropy)
   * 3. Optional prefix for categorization
   * 
   * This approach ensures:
   * - Chronological ordering (useful for databases)
   * - High collision resistance due to the random component
   * - Compact representation through base64 encoding
   * 
   * @param prefix Optional prefix to categorize IDs
   * @param randomBytes Number of random bytes to use (default: 8)
   * @returns A unique string ID
   */
  generateUniqueId(prefix = '', randomBytes = 8): string {
    // Get current timestamp in milliseconds
    const timestamp = Date.now();
    
    // Generate random bytes and convert to base64
    const randomStr = crypto
      .randomBytes(randomBytes)
      .toString('base64')
      .replace(/[+/=]/g, '') // Remove non-URL safe characters
      .substring(0, 11); // Trim to reasonable length
    
    // Combine timestamp and random string
    return `${prefix}${timestamp}${randomStr}`;
  }
  
  /**
   * Generates a shorter unique ID using a combination of timestamp and random characters.
   * This method produces shorter IDs but with slightly higher collision probability.
   * 
   * @param prefix Optional prefix to categorize IDs
   * @returns A shorter unique string ID
   */
  generateShortUniqueId(prefix = ''): string {
    // Get current timestamp and convert to base36
    const timestamp = Date.now().toString(36);
    
    // Generate 4 random bytes and convert to base36
    const randomStr = crypto
      .randomBytes(4)
      .toString('hex')
      .substring(0, 6);
    
    // Combine timestamp and random string
    return `${prefix}${timestamp}${randomStr}`;
  }
  
  /**
   * Generates a UUID v4 (random) using the crypto module.
   * This is useful when you need a standardized UUID format.
   * 
   * @returns A UUID v4 string
   */
  generateUuidV4(): string {
    return crypto.randomUUID();
  }
}