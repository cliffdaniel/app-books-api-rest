import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray } from 'class-validator';

export class CreateBookDto {
    @ApiProperty({ description: 'Título del libro', example: 'Clean Code' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'Número de capítulos', example: 20 })
    @IsNumber()
    chapters: number;

    @ApiProperty({ description: 'Número de páginas', example: 464 })
    @IsNumber()
    pages: number;

    @ApiProperty({ description: 'Año de publicación', example: 2008 })
    @IsNumber()
    publicationYear: number;

    @ApiProperty({ description: 'Lista de IDs de autores', example: ['67818290d866ad47ea7be402'] })
    @IsArray()
    authors: string[];
}
