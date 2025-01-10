import { Injectable, Inject } from '@nestjs/common';

import { NotFoundException } from '../../../../shared/exceptions/not-found.exception';
import { AuthorRepository } from '../../domain/repositories/author.repository';

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
