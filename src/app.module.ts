import { Module } from '@nestjs/common';

import { MongooseConfig } from './config/mongoose.config';
import { AuthorsModule } from './modules/authors/authors.module';
import { BooksModule } from './modules/books/books.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
    imports: [MongooseConfig, BooksModule, AuthorsModule, DatabaseModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
