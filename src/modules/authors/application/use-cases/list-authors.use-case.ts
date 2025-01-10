import { Injectable, Inject } from '@nestjs/common';

import { Author } from '../../domain/entities/author.entity';
import { AuthorRepository } from '../../domain/repositories/author.repository';

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
