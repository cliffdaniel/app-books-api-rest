import { Controller, Delete } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiExcludeEndpoint } from '@nestjs/swagger';

import { DatabaseService } from './database.service';

@ApiTags('Database')
@Controller('database')
export class DatabaseController {
    constructor(private readonly databaseService: DatabaseService) {}

    @Delete('reset')
    @ApiExcludeEndpoint()
    @ApiResponse({
        status: 200,
        description: 'Base de datos reseteada correctamente.',
    })
    @ApiResponse({
        status: 500,
        description: 'Error al intentar resetear la base de datos.',
    })
    async resetDatabase(): Promise<{ message: string }> {
        await this.databaseService.resetDatabase();
        return { message: 'Base de datos reseteada correctamente' };
    }
}
