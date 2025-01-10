import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CreateAuthorUseCase } from './application/use-cases/create-author.use-case';
import { ListAuthorsUseCase } from './application/use-cases/list-authors.use-case';
import { UpdateAuthorBooksUseCase } from './application/use-cases/update-author-books.use-case';
import { AuthorController } from './infrastructure/controllers/author.controller';
import { MongooseAuthorRepository } from './infrastructure/repositories/mongoose-author.repository';
import { AuthorSchema } from './infrastructure/schemas/author.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }])],
    controllers: [AuthorController],
    providers: [
        {
            provide: 'AuthorRepository',
            useClass: MongooseAuthorRepository,
        },
        CreateAuthorUseCase,
        ListAuthorsUseCase,
        UpdateAuthorBooksUseCase,
    ],
    exports: [CreateAuthorUseCase, ListAuthorsUseCase, UpdateAuthorBooksUseCase],
})
export class AuthorsModule {}
