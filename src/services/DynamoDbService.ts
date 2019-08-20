import { DataMapper } from '@aws/dynamodb-data-mapper';
import { ZeroArgumentsConstructor } from '@aws/dynamodb-data-marshaller';
import * as fs from 'fs';
import { inject, injectable } from 'inversify';
import { logger } from '../logger.config';
import { TYPES } from '../TYPES';

@injectable()
export class DynamoDbService {
    public mapper: DataMapper;
    constructor(@inject(TYPES.DataMapper) mapper: DataMapper) {
        this.mapper = mapper;
    }

    public async putItems<T>(items: T[]): Promise<AsyncIterableIterator<T>> {
        try {
            return await this.mapper.batchPut(items);
        } catch (error) {
            logger.error(error.message, { error });
            throw error;
        }
    }

    public async batchLoadFromFile(path: string, valueConstructor: ZeroArgumentsConstructor<any>) {
        const items: any[] = JSON.parse(fs.readFileSync(path, 'utf8'));
        this.putItems(items.map(item => Object.assign(new valueConstructor(), item)));
    }
}
