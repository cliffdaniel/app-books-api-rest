import { Injectable, Inject } from '@nestjs/common';

import { CreateAuthorDto } from '../dto/create-author.dto';

import { Author } from '@/modules/authors/domain/entities/author.entity';
import { AuthorRepository } from '@/modules/authors/domain/repositories/author.repository';

@Injectable()
export class CreateAuthorUseCase {
    constructor(
        @Inject('AuthorRepository')
        private readonly authorRepository: AuthorRepository,
    ) {}

    async execute(createAuthorDto: CreateAuthorDto): Promise<Author> {
        const author = new Author(null, createAuthorDto.name, createAuthorDto?.books ?? []);
        return this.authorRepository.create(author);
    }
}
