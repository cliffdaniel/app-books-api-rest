import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { DatabaseService } from './modules/database/database.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const databaseSeedService = app.get(DatabaseService);

    await databaseSeedService.seed();

    console.log('Database seeded!');
    await app.close();
}

bootstrap();
