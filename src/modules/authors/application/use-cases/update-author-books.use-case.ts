import { Injectable, Inject } from '@nestjs/common';

import { AuthorRepository } from '../../domain/repositories/author.repository';

@Injectable()
export class UpdateAuthorBooksUseCase {
    constructor(
        @Inject('AuthorRepository')
        private readonly authorRepository: AuthorRepository,
    ) {}

    async execute(authorId: string, bookId: string): Promise<void> {
        const author = await this.authorRepository.findById(authorId);
        if (!author) {
            throw new Error(`Author with ID ${authorId} not found`);
        }
        author.books.push(bookId);
        await this.authorRepository.update(authorId, author);
    }
}
