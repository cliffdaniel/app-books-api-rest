import { Injectable, Inject } from '@nestjs/common';

import { CreateAuthorUseCase } from '../../../authors/application/use-cases/create-author.use-case';
import { ListAuthorsUseCase } from '../../../authors/application/use-cases/list-authors.use-case';
import { UpdateAuthorBooksUseCase } from '../../../authors/application/use-cases/update-author-books.use-case';
import { Book } from '../../domain/entities/book.entity';
import { BookRepository } from '../../domain/repositories/book.repository';
import { CreateBookDto } from '../dto/create-book.dto';

@Injectable()
export class CreateBookUseCase {
    constructor(
        @Inject('BookRepository')
        private readonly bookRepository: BookRepository,
        private readonly createAuthorUseCase: CreateAuthorUseCase,
        private readonly listAuthorsUseCase: ListAuthorsUseCase,
        private readonly updateAuthorBooksUseCase: UpdateAuthorBooksUseCase,
    ) {}

    async execute(createBookDto: CreateBookDto): Promise<Book> {
        const existingAuthors = await this.listAuthorsUseCase.execute();

        const authorIds = await Promise.all(
            createBookDto.authors.map(async (authorName) => {
                const existingAuthor = existingAuthors.find(
                    (author) => author.name === authorName,
                );

                if (existingAuthor) {
                    return existingAuthor.id;
                }

                const newAuthor = await this.createAuthorUseCase.execute({
                    name: authorName,
                    books: [],
                });

                return newAuthor.id;
            }),
        );

        const book = new Book(
            null,
            createBookDto.title,
            createBookDto.chapters,
            createBookDto.pages,
            createBookDto.publicationYear,
            authorIds,
        );

        const createdBook = await this.bookRepository.create(book);

        await Promise.all(
            authorIds.map((authorId) =>
                this.updateAuthorBooksUseCase.execute(authorId, createdBook.id),
            ),
        );

        return createdBook;
    }
}
