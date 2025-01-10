import { Controller, Post, Get, Body, Query, Delete, Param } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';

import { CreateBookDto } from '../../application/dto/create-book.dto';
import { CreateBookUseCase } from '../../application/use-cases/create-book.use-case';
import { GetAveragePagesUseCase } from '../../application/use-cases/get-average-pages.use-case';
import { ListBooksUseCase } from '../../application/use-cases/list-books.use-case';
import { SoftDeleteBookUseCase } from '../../application/use-cases/soft-delete-book.use-case';

@ApiTags('Books')
@Controller('books')
export class BookController {
    constructor(
        private readonly createBookUseCase: CreateBookUseCase,
        private readonly listBooksUseCase: ListBooksUseCase,
        private readonly getAveragePagesUseCase: GetAveragePagesUseCase,
        private readonly softDeleteBookUseCase: SoftDeleteBookUseCase
    ) {}

    @Post()
    @ApiBody({ type: CreateBookDto })
    @ApiResponse({ status: 201, description: 'El libro fue creado correctamente.' })
    @ApiResponse({ status: 400, description: 'Error de validación en los datos enviados.' })
    async create(@Body() createBookDto: CreateBookDto) {
        return this.createBookUseCase.execute(createBookDto);
    }

    @Get()
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' })
    @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Cantidad de resultados por página' })
    @ApiResponse({ status: 200, description: 'Lista de libros activos.' })
    async findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        return this.listBooksUseCase.execute({ page, limit });
    }

    @Get('average-pages')
    @ApiResponse({ status: 200, description: 'Promedio de páginas por capítulo de los libros activos.' })
    async findAveragePages() {
        return this.getAveragePagesUseCase.execute();
    }

    @Delete(':id')
    @ApiParam({ name: 'id', type: String, description: 'ID del libro a eliminar' })
    @ApiResponse({ status: 200, description: 'Libro eliminado lógicamente.' })
    @ApiResponse({ status: 404, description: 'Libro no encontrado.' })
    async delete(@Param('id') id: string): Promise<{ message: string }> {
        await this.softDeleteBookUseCase.execute(id);
        return { message: 'Libro eliminado lógicamente' };
    }
}
