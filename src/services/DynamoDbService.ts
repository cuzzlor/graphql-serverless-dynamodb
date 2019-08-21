import { DataMapper, SyncOrAsyncIterable } from '@aws/dynamodb-data-mapper';
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

    public async batchPut<T>(items: SyncOrAsyncIterable<T>) {
        const reportEvery = 100;
        let persisted = 0;
        const log = () => logger.verbose(`batch put ${persisted}`);
        for await (const _ of this.mapper.batchPut<T>(items)) {
            if (++persisted % reportEvery === 0) {
                log();
            }
        }
        log();
    }

    public async batchLoadFromFile(
        path: string,
        valueConstructor: ZeroArgumentsConstructor<any>,
        mapper?: (value: any) => any,
    ) {
        let items: any[] = JSON.parse(fs.readFileSync(path, 'utf8'));
        if (mapper) {
            items = items.map(mapper);
        }
        this.batchPut(items.map(item => Object.assign(new valueConstructor(), item)));
    }
}
