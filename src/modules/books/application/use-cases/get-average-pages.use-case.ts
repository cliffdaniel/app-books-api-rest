import { Injectable, Inject } from '@nestjs/common';

import { Book } from '../../domain/entities/book.entity';
import { BookRepository } from '../../domain/repositories/book.repository';

@Injectable()
export class GetAveragePagesUseCase {
    constructor(
        @Inject('BookRepository')
        private readonly bookRepository: BookRepository,
    ) {}

    async execute(): Promise<{ book: Book; average: number }[]> {
        return this.bookRepository.findAveragePages();
    }
}
