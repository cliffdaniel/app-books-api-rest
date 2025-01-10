import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { StatusValue } from '../../../../shared/domain/values/status.value';
import { Book } from '../../domain/entities/book.entity';
import { BookRepository } from '../../domain/repositories/book.repository';

@Injectable()
export class MongooseBookRepository implements BookRepository {
    constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

    async create(book: Book): Promise<Book> {
        const createdBook = new this.bookModel(book);
        return createdBook.save();
    }

    async findAll(): Promise<Book[]> {
        return this.bookModel.find({ status: StatusValue.ACTIVE }).populate('authors').exec();
    }

    async findAllPaginated(page: number, limit: number): Promise<{ data: Book[]; total: number }> {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.bookModel.find({ status: StatusValue.ACTIVE }).populate('authors').skip(skip).limit(limit).exec(),
            this.bookModel.countDocuments({ status: StatusValue.ACTIVE }),
        ]);
        return { data, total };
    }

    async findAveragePages(): Promise<{ book: Book; average: number }[]> {
        const books = await this.bookModel.find({ status: 'ACTIVE' }).exec();
    
        return books.map((book) => ({
            book: new Book(
                book._id.toString(),
                book.title,
                book.chapters,
                book.pages,
                book.publicationYear,
                book.authors,
                book.status,
            ),
            average: parseFloat((book.pages / book.chapters).toFixed(2)),
        }));
    }    

    async findById(id: string): Promise<Book | null> {
        const bookDocument = await this.bookModel.findOne({ _id: id, status: StatusValue.ACTIVE }).exec();
        if (!bookDocument) {
            return null;
        }

        return new Book(
            bookDocument._id.toString(),
            bookDocument.title,
            bookDocument.chapters,
            bookDocument.pages,
            bookDocument.publicationYear,
            bookDocument.authors,
            bookDocument.status,
        );
    }

    async update(id: string, book: Book): Promise<void> {
        await this.bookModel.findByIdAndUpdate(id, {
            title: book.title,
            chapters: book.chapters,
            pages: book.pages,
            publicationYear: book.publicationYear,
            status: book.status,
            authors: book.authors,
        }).exec();
    }

    async softDelete(id: string): Promise<void> {
        await this.bookModel.findByIdAndUpdate(id, { status: StatusValue.INACTIVE }).exec();
    }
}
