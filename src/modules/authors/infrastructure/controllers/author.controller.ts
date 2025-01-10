import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';

import { CreateAuthorDto } from '../../application/dto/create-author.dto';
import { CreateAuthorUseCase } from '../../application/use-cases/create-author.use-case';
import { ListAuthorsUseCase } from '../../application/use-cases/list-authors.use-case';

@ApiTags('Authors')
@Controller('authors')
export class AuthorController {
    constructor(
        private readonly createAuthorUseCase: CreateAuthorUseCase,
        private readonly listAuthorsUseCase: ListAuthorsUseCase,
    ) {}

    @Post()
    @ApiBody({ type: CreateAuthorDto })
    @ApiResponse({ status: 201, description: 'El autor fue creado correctamente.' })
    @ApiResponse({ status: 400, description: 'Error de validación en los datos enviados.' })
    async create(@Body() createAuthorDto: CreateAuthorDto) {
        return this.createAuthorUseCase.execute(createAuthorDto);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Lista de autores activos junto con sus libros.' })
    async findAll() {
        return this.listAuthorsUseCase.execute();
    }
}
