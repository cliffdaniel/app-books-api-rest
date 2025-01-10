import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthorsModule } from '../authors/authors.module';
import { CreateBookUseCase } from './application/use-cases/create-book.use-case';
import { GetAveragePagesUseCase } from './application/use-cases/get-average-pages.use-case';
import { ListBooksUseCase } from './application/use-cases/list-books.use-case';
import { SoftDeleteBookUseCase } from './application/use-cases/soft-delete-book.use-case';
import { BookController } from './infrastructure/controllers/book.controller';
import { MongooseBookRepository } from './infrastructure/repositories/mongoose-book.repository';
import { BookSchema } from './infrastructure/schemas/book.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
        AuthorsModule,
    ],
    controllers: [BookController],
    providers: [
        {
            provide: 'BookRepository',
            useClass: MongooseBookRepository,
        },
        CreateBookUseCase,
        ListBooksUseCase,
        GetAveragePagesUseCase,
        SoftDeleteBookUseCase
    ],
})
export class BooksModule {}
