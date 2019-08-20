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

    public async putItems<T>(items: T[]) {
        const batchReportSize = 100;
        let persisted = 0;
        const log = () => logger.verbose(`batch put ${persisted} of ${items.length}`);
        for await (const _ of this.mapper.batchPut<T>(items)) {
            if (++persisted % batchReportSize === 0) {
                log();
            }
        }
        log();
    }

    public async batchLoadFromFile(path: string, valueConstructor: ZeroArgumentsConstructor<any>) {
        const items: any[] = JSON.parse(fs.readFileSync(path, 'utf8'));
        this.putItems(items.map(item => Object.assign(new valueConstructor(), item)));
    }
}
