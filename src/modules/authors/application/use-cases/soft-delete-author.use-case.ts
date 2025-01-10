import { Injectable, Inject } from '@nestjs/common';

import { AuthorRepository } from '@/modules/authors/domain/repositories/author.repository';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';

@Injectable()
export class SoftDeleteAuthorUseCase {
    constructor(@Inject('AuthorRepository') private readonly authorRepository: AuthorRepository) {}

    async execute(id: string): Promise<void> {
        const author = await this.authorRepository.findById(id);

        if (!author) {
            throw new NotFoundException(`Author with ID ${id} not found`);
        }

        author.deactivate();
        await this.authorRepository.update(id, author);
    }
}
