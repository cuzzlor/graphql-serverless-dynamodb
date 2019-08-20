import { DataMapper } from '@aws/dynamodb-data-mapper';
import { ZeroArgumentsConstructor } from '@aws/dynamodb-data-marshaller';
import * as fs from 'fs';
import { inject } from 'inversify';
import { TYPES } from '../TYPES';

export class DynamoDbService {
    public mapper: DataMapper;
    constructor(@inject(TYPES.DataMapper) mapper: DataMapper) {
        this.mapper = mapper;
    }

    public async putItems(items: any[]) {
        items.forEach(item => {
            this.mapper.put(item);
        });
    }

    public async batchLoadFromFile(path: string, valueConstructor: ZeroArgumentsConstructor<any>) {
        const items: any[] = JSON.parse(fs.readFileSync(path, 'utf8'));
        this.putItems(items.map(item => Object.assign(new valueConstructor(), item)));
    }
}
