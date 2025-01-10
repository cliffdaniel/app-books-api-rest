import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';
import { Author, AuthorSchema } from '../authors/infrastructure/schemas/author.schema';
import { Book, BookSchema } from '../books/infrastructure/schemas/book.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
        MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
    ],
    providers: [DatabaseService],
    controllers: [DatabaseController],
    exports: [DatabaseService],
})
export class DatabaseModule {}
