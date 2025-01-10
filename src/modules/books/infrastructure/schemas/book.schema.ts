import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { Author } from '@/modules/authors/infrastructure/schemas/author.schema';

@Schema()
export class Book extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    chapters: number;

    @Prop({ required: true })
    pages: number;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }] })
    authors: Author[];

    @Prop({ required: true, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' })
    status: string;

    @Prop({ required: true })
    publicationYear: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
