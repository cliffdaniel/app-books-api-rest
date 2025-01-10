import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { Author } from '../authors/domain/entities/author.entity';
import { Book } from '../books/infrastructure/schemas/book.schema';

@Injectable()
export class DatabaseService {
    constructor(
        @InjectConnection() private readonly connection: Connection,
        @InjectModel(Author.name) private readonly authorRepository: Model<Author>,
        @InjectModel(Book.name) private readonly bookRepository: Model<Book>,
    ) {}

    async resetDatabase(): Promise<void> {
        const collections = await this.connection.db.collections();

        for (const collection of collections) {
            await collection.drop().catch((err) => {
                if (err.message !== 'ns not found') {
                    throw err;
                }
            });
        }

        console.log('Todas las colecciones han sido eliminadas.');
    }

    async seed() {
        await this.resetDatabase();

        const author1 = new this.authorRepository({ name: 'Robert C. Martin' });
        const author2 = new this.authorRepository({ name: 'Martin Fowler' });

        await author1.save();
        await author2.save();

        const book1 = new this.bookRepository({
            title: 'Clean Code',
            chapters: 20,
            pages: 464,
            publicationYear: 2008,
            authors: [author1._id],
        });

        const book2 = new this.bookRepository({
            title: 'Refactoring',
            chapters: 12,
            pages: 448,
            publicationYear: 2018,
            authors: [author2._id],
        });

        await book1.save();
        await book2.save();

        console.log('Database seeded!');
    }
}
