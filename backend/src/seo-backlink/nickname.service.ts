import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

interface NicknameData {
  nicknames: string[];
  user_mappings: { [key: string]: string };
}

@Injectable()
export class NicknameService {
  private readonly dataPath: string;
  private nicknameData: NicknameData;
  private readonly lockPath: string;
  private isLocked = false;

  constructor() {
    // Use environment-specific data path
    const env = process.env.NODE_ENV || 'development';
    this.dataPath = path.join(__dirname, `../../data/user-nicknames-${env}.json`);
    this.lockPath = path.join(__dirname, `../../data/user-nicknames-${env}.lock`);
    // Initialize data synchronously for constructor
    this.initializeData();
  }

  private initializeData(): void {
    try {
      const data = fs.readFileSync(this.dataPath, 'utf8');
      this.nicknameData = JSON.parse(data);
    } catch (error) {
      console.log(`Nickname file not found at ${this.dataPath}, creating new one...`);
      // If file doesn't exist, create default structure
      this.nicknameData = {
        nicknames: [
          "rabbit", "bunny", "cat", "dog", "fox", "wolf", "bear", "deer", "squirrel", "owl",
          "eagle", "hawk", "penguin", "dolphin", "whale", "shark", "tiger", "lion", "elephant", "giraffe",
          "zebra", "panda", "koala", "kangaroo", "platypus", "emu", "ostrich", "flamingo", "peacock", "swan",
          "duck", "goose", "turkey", "chicken", "rooster", "cow", "horse", "sheep", "goat", "pig",
          "hamster", "guinea_pig", "ferret", "chinchilla", "hedgehog", "sloth", "anteater", "armadillo", "capybara", "beaver"
        ],
        user_mappings: {}
      };
      this.saveNicknameDataSync();
    }
  }

  private acquireLock(): boolean {
    if (this.isLocked) return false;
    
    try {
      // Try to create lock file
      fs.writeFileSync(this.lockPath, process.pid.toString(), { flag: 'wx' });
      this.isLocked = true;
      return true;
    } catch (error) {
      // Lock file already exists
      return false;
    }
  }

  private releaseLock(): void {
    if (this.isLocked) {
      try {
        fs.unlinkSync(this.lockPath);
      } catch (error) {
        // Ignore errors when releasing lock
      }
      this.isLocked = false;
    }
  }

  private async waitForLock(maxWaitMs: number = 5000): Promise<boolean> {
    const startTime = Date.now();
    while (Date.now() - startTime < maxWaitMs) {
      if (this.acquireLock()) {
        return true;
      }
      // Wait a bit before trying again
      const waitTime = Math.min(100, maxWaitMs - (Date.now() - startTime));
      if (waitTime > 0) {
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
    return false;
  }

  private async loadNicknameData(): Promise<void> {
    if (!(await this.waitForLock())) {
      throw new Error('Could not acquire lock for nickname data');
    }
    
    try {
      const data = fs.readFileSync(this.dataPath, 'utf8');
      this.nicknameData = JSON.parse(data);
    } catch (error) {
      console.log(`Nickname file not found at ${this.dataPath}, creating new one...`);
      // If file doesn't exist, create default structure
      this.nicknameData = {
        nicknames: [
          "rabbit", "bunny", "cat", "dog", "fox", "wolf", "bear", "deer", "squirrel", "owl",
          "eagle", "hawk", "penguin", "dolphin", "whale", "shark", "tiger", "lion", "elephant", "giraffe",
          "zebra", "panda", "koala", "kangaroo", "platypus", "emu", "ostrich", "flamingo", "peacock", "swan",
          "duck", "goose", "turkey", "chicken", "rooster", "cow", "horse", "sheep", "goat", "pig",
          "hamster", "guinea_pig", "ferret", "chinchilla", "hedgehog", "sloth", "anteater", "armadillo", "capybara", "beaver"
        ],
        user_mappings: {}
      };
      this.saveNicknameData();
    } finally {
      this.releaseLock();
    }
  }

  private saveNicknameDataSync(): void {
    try {
      // Ensure directory exists
      const dir = path.dirname(this.dataPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.dataPath, JSON.stringify(this.nicknameData, null, 2));
      console.log(`Nickname data saved to ${this.dataPath}`);
    } catch (error) {
      console.error(`Failed to save nickname data to ${this.dataPath}:`, error);
    }
  }

  private saveNicknameData(): void {
    if (!this.acquireLock()) {
      throw new Error('Could not acquire lock for saving nickname data');
    }
    
    try {
      // Ensure directory exists
      const dir = path.dirname(this.dataPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.dataPath, JSON.stringify(this.nicknameData, null, 2));
      console.log(`Nickname data saved to ${this.dataPath}`);
    } catch (error) {
      console.error(`Failed to save nickname data to ${this.dataPath}:`, error);
    } finally {
      this.releaseLock();
    }
  }

  async getNickname(userId: number): Promise<string> {
    const userIdStr = userId.toString();
    
    // Check if user already has a nickname
    if (this.nicknameData.user_mappings[userIdStr]) {
      return this.nicknameData.user_mappings[userIdStr];
    }

    // Reload data to get latest state before assigning
    await this.loadNicknameData();
    
    // Double-check after reload
    if (this.nicknameData.user_mappings[userIdStr]) {
      return this.nicknameData.user_mappings[userIdStr];
    }

    // Assign a new nickname
    const availableNicknames = this.nicknameData.nicknames.filter(
      nickname => !Object.values(this.nicknameData.user_mappings).includes(nickname)
    );

    if (availableNicknames.length === 0) {
      // If all nicknames are used, generate a unique one
      const baseNickname = this.nicknameData.nicknames[0];
      const uniqueNickname = `${baseNickname}_${userId}_${Date.now()}`;
      this.nicknameData.user_mappings[userIdStr] = uniqueNickname;
    } else {
      // Pick a random available nickname
      const randomIndex = Math.floor(Math.random() * availableNicknames.length);
      const selectedNickname = availableNicknames[randomIndex];
      this.nicknameData.user_mappings[userIdStr] = selectedNickname;
    }

    this.saveNicknameData();
    return this.nicknameData.user_mappings[userIdStr];
  }

  getAllNicknames(): { [key: string]: string } {
    return this.nicknameData.user_mappings;
  }

  // Method to migrate data between environments
  async migrateFromDatabase(): Promise<void> {
    // This would be implemented if you move to database storage
    console.log('Database migration not implemented yet');
  }
} 