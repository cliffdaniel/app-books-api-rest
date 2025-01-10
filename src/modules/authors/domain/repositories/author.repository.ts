import { Author } from '../entities/author.entity';

export interface AuthorRepository {
    create(author: Author): Promise<Author>;
    findById(id: string): Promise<Author | null>;
    update(id: string, author: Author): Promise<void>;
    findAll(): Promise<Author[]>;
    softDelete(id: string): Promise<void>;
}