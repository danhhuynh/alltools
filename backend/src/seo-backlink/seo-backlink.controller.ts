import { Controller, Get, Post, Body, Param, Delete, HttpException, HttpStatus, UseGuards, Request, Query } from '@nestjs/common';
import { SeoBacklinkService } from './seo-backlink.service';
import { SeoBacklink } from './seo-backlink.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('seo-backlink')
export class SeoBacklinkController {
  constructor(private readonly seoBacklinkService: SeoBacklinkService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createBacklinkDto: { description: string; url_link: string }, @Request() req): Promise<any> {
    try {
      // Validate input
      if (!createBacklinkDto.description || !createBacklinkDto.url_link) {
        throw new HttpException('Description and URL link are required', HttpStatus.BAD_REQUEST);
      }

      if (createBacklinkDto.description.length > 400) {
        throw new HttpException('Description cannot exceed 400 characters', HttpStatus.BAD_REQUEST);
      }

      // Validate URL format
      try {
        new URL(createBacklinkDto.url_link);
      } catch (error) {
        throw new HttpException('Invalid URL format', HttpStatus.BAD_REQUEST);
      }

      const backlink = await this.seoBacklinkService.create({
        ...createBacklinkDto,
        user_id: req.user.userId
      });
      return {
        success: true,
        message: 'Backlink created successfully',
        data: backlink,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Failed to create backlink', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10): Promise<any> {
    const [items, total] = await this.seoBacklinkService.findAll(
      undefined, // No user_id for public access
      {
        page: +page,
        limit: +limit,
      }
    );

    return {
      items,
      meta: {
        total,
        page: +page,
        limit: +limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string, @Request() req): Promise<SeoBacklink> {
    const backlink = await this.seoBacklinkService.findOne(+id, req.user.userId);
    if (!backlink) {
      throw new HttpException('Backlink not found', HttpStatus.NOT_FOUND);
    }
    return backlink;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @Request() req): Promise<any> {
    try {
      const backlink = await this.seoBacklinkService.findOne(+id, req.user.userId);
      if (!backlink) {
        throw new HttpException('Backlink not found', HttpStatus.NOT_FOUND);
      }
      await this.seoBacklinkService.remove(+id, req.user.userId);
      return {
        success: true,
        message: 'Backlink deleted successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Failed to delete backlink', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}