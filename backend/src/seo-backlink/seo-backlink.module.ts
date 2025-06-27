import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeoBacklinkController } from './seo-backlink.controller';
import { SeoBacklinkService } from './seo-backlink.service';
import { SeoBacklink } from './seo-backlink.entity';
import { NicknameService } from './nickname.service';

@Module({
  imports: [TypeOrmModule.forFeature([SeoBacklink])],
  controllers: [SeoBacklinkController],
  providers: [SeoBacklinkService, NicknameService],
  exports: [SeoBacklinkService],
})
export class SeoBacklinkModule {}