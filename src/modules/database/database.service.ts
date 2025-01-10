import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService {
    constructor(@InjectConnection() private readonly connection: Connection) {}

    async resetDatabase(): Promise<void> {
        const collections = await this.connection.db.collections();

        for (const collection of collections) {
            await collection.drop().catch((err) => {
                if (err.message !== 'ns not found') {
                    throw err;
                }
            });
        }

        console.log('Todas las colecciones han sido eliminadas.');
    }
}
