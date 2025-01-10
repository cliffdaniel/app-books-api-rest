import { Injectable, Inject } from '@nestjs/common';

import { PaginationDto } from '../dto/pagination.dto';

import { Book } from '@/modules/books/domain/entities/book.entity';
import { BookRepository } from '@/modules/books/domain/repositories/book.repository';

@Injectable()
export class ListBooksUseCase {
    constructor(
        @Inject('BookRepository')
        private readonly bookRepository: BookRepository,
    ) {}

    async execute(paginationDto: PaginationDto): Promise<{ data: Book[]; total: number }> {
        const { page, limit } = paginationDto;
        return this.bookRepository.findAllPaginated(page, limit);
    }
}
