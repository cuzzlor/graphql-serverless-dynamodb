import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDB } from 'aws-sdk';
import config from 'config';
import { Container } from 'inversify';
import 'reflect-metadata';
import { Logger, LoggerOptions } from 'winston';
import { Loaders } from './data/Loaders';
import { createDefaultLogger } from './logger.config';
import { DynamoDbService } from './services/DynamoDbService';
import { MovieService } from './services/MovieService';
import { TYPES } from './TYPES';

export const container = new Container();

container
    .bind<DataMapper>(TYPES.DataMapper)
    .toConstantValue(
        new DataMapper({ client: new DynamoDB(), tableNamePrefix: config.get<string>('dynamodb.tableNamePrefix') }),
    );

container
    .bind<DynamoDbService>(TYPES.DynamoDbService)
    .to(DynamoDbService)
    .inSingletonScope();

container
    .bind<MovieService>(TYPES.MovieService)
    .to(MovieService)
    .inSingletonScope();

export const createChildContainer = (options?: { requestContextLoggerOptions: Partial<LoggerOptions> }): Container => {
    const childContainer = container.createChild();

    childContainer
        .bind<Loaders>(TYPES.DataLoaders)
        .to(Loaders)
        .inSingletonScope();

    const requestContextLogger = createDefaultLogger(
        options && options.requestContextLoggerOptions ? options.requestContextLoggerOptions : undefined,
    );

    childContainer.bind<Logger>(TYPES.RequestContextLogger).toConstantValue(requestContextLogger);

    return childContainer;
};
