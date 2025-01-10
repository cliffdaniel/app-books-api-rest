import { Book } from '../entities/book.entity';

export interface BookRepository {
    create(book: Book): Promise<Book>;
    findAll(): Promise<Book[]>;
    findAllPaginated(page: number, limit: number): Promise<{ data: Book[]; total: number }>;
    findAveragePages(): Promise<{ book: Book; average: number }[]>;
    findById(id: string): Promise<Book | null>;
    update(id: string, book: Book): Promise<void>;
    softDelete(id: string): Promise<void>;
}
