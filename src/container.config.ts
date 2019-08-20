import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DynamoDB } from 'aws-sdk';
import config from 'config';
import { Container } from 'inversify';
import 'reflect-metadata';
import { Loaders } from './data/Loaders';
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

export const createChildContainer = (): Container => {
    const childContainer = container.createChild();

    childContainer
        .bind<Loaders>(TYPES.DataLoaders)
        .to(Loaders)
        .inSingletonScope();

    return childContainer;
};
