import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Author } from '@/modules/authors/domain/entities/author.entity';
import { AuthorRepository } from '@/modules/authors/domain/repositories/author.repository';
import { StatusValue } from '@/shared/domain/values/status.value';

@Injectable()
export class MongooseAuthorRepository implements AuthorRepository {
    constructor(@InjectModel('Author') private readonly authorModel: Model<Author>) {}

    async create(author: Author): Promise<Author> {
        const createdAuthor = new this.authorModel(author);
        return createdAuthor.save();
    }

    async findById(id: string): Promise<Author | null> {
        return this.authorModel.findById(id).exec();
    }

    async update(id: string, author: Author): Promise<void> {
        await this.authorModel.findByIdAndUpdate(id, { $set: author }).exec();
    }

    async findAll(): Promise<Author[]> {
        return this.authorModel.find({ status: 'ACTIVE' }).populate('books').exec();
    }

    async softDelete(id: string): Promise<void> {
        await this.authorModel.findByIdAndUpdate(id, { status: StatusValue.INACTIVE }).exec();
    }
}
