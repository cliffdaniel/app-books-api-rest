import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateAuthorDto {
    @ApiProperty({ description: 'Nombre del autor', example: 'Robert C. Martin' })
    @IsString()
    name: string;

    // `books` no será documentado en Swagger
    @IsOptional()
    @IsArray()
    books?: string[];
}
