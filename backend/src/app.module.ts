import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {IdGeneratorModule} from './id-generator/id-generator.module';
import {CharacterCounterModule} from './character-counter/character-counter.module';
import {CsvUploaderModule} from './csv-uploader/csv-uploader.module';
import {SeoBacklinkModule} from './seo-backlink/seo-backlink.module';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from './auth/auth.module';

@Module({
    imports: [
        AuthModule,
        IdGeneratorModule, 
        CharacterCounterModule, 
        CsvUploaderModule, 
        SeoBacklinkModule,
        ConfigModule.forRoot({
            isGlobal: true, // Make ConfigModule available globally
        }),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'database.sqlite',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true, // Auto-create database schema (use with caution in production)
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
