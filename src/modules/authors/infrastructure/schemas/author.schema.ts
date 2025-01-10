import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { Book } from '@/modules/books/infrastructure/schemas/book.schema';

@Schema()
export class Author extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' })
    status: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }] })
    books: Book[];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
