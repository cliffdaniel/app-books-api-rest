import { Injectable, Inject } from '@nestjs/common';

import { NotFoundException } from '../../../../shared/exceptions/not-found.exception';
import { BookRepository } from '../../domain/repositories/book.repository';

@Injectable()
export class SoftDeleteBookUseCase {
    constructor(@Inject('BookRepository') private readonly bookRepository: BookRepository) {}

    async execute(id: string): Promise<void> {
        const book = await this.bookRepository.findById(id);

        if (!book) {
            throw new NotFoundException(`Book with ID ${id} not found`);
        }

        book.deactivate();
        await this.bookRepository.update(id, book);
    }
}
