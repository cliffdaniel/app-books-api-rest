import { Injectable, Inject } from '@nestjs/common';

import { Author } from '@/modules/authors/domain/entities/author.entity';
import { AuthorRepository } from '@/modules/authors/domain/repositories/author.repository';


@Injectable()
export class ListAuthorsUseCase {
    constructor(
        @Inject('AuthorRepository')
        private readonly authorRepository: AuthorRepository,
    ) {}

    async execute(): Promise<Author[]> {
        return this.authorRepository.findAll();
    }
}
