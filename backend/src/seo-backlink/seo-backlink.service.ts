import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeoBacklink } from './seo-backlink.entity';
import { NicknameService } from './nickname.service';

interface SeoBacklinkWithNickname extends SeoBacklink {
  nickname: string;
}

@Injectable()
export class SeoBacklinkService {
  constructor(
    @InjectRepository(SeoBacklink)
    private seoBacklinkRepository: Repository<SeoBacklink>,
    private nicknameService: NicknameService,
  ) {}

  async create(backlinkData: { description: string; url_link: string; user_id: number }): Promise<SeoBacklinkWithNickname> {
    // Check if user has reached the limit of 5 entries
    const userBacklinkCount = await this.seoBacklinkRepository.count({
      where: { user_id: backlinkData.user_id }
    });

    if (userBacklinkCount >= 5) {
      throw new ForbiddenException('You have reached the maximum limit of 5 backlink entries.');
    }

    const newBacklink = this.seoBacklinkRepository.create(backlinkData);
    const savedBacklink = await this.seoBacklinkRepository.save(newBacklink);
    
    // Add nickname to the response
    const nickname = await this.nicknameService.getNickname(backlinkData.user_id);
    return { ...savedBacklink, nickname } as SeoBacklinkWithNickname;
  }

  async findAll(user_id?: number, options?: { page: number; limit: number }): Promise<[SeoBacklinkWithNickname[], number]> {
    const whereClause = user_id ? { user_id } : {};
    const [items, total] = await this.seoBacklinkRepository.findAndCount({
      where: whereClause,
      order: {
        created_at: 'DESC',
      },
      skip: options ? (options.page - 1) * options.limit : 0,
      take: options?.limit || 10,
    });

    // Add nicknames to each backlink
    const itemsWithNicknames = await Promise.all(items.map(async item => ({
      ...item,
      nickname: await this.nicknameService.getNickname(item.user_id)
    }))) as SeoBacklinkWithNickname[];

    return [itemsWithNicknames, total];
  }

  async findOne(id: number, user_id?: number): Promise<SeoBacklinkWithNickname | null> {
    const whereClause = user_id ? { id, user_id } : { id };
    const backlink = await this.seoBacklinkRepository.findOne({ where: whereClause });
    
    if (backlink) {
      const nickname = await this.nicknameService.getNickname(backlink.user_id);
      return { ...backlink, nickname } as SeoBacklinkWithNickname;
    }
    
    return null;
  }

  async remove(id: number, user_id?: number): Promise<void> {
    const whereClause = user_id ? { id, user_id } : { id };
    const result = await this.seoBacklinkRepository.delete(whereClause);
    if (result.affected === 0) {
      throw new ForbiddenException('Backlink not found or you do not have permission to delete it.');
    }
  }
}