import { IncomingMessage } from 'http';
import { Container } from 'inversify';
import 'reflect-metadata';
import { Loaders } from './data/Loaders';
import { MovieService } from './services/MovieService';
import { TYPES } from './TYPES';

export const container = new Container();

container
    .bind<MovieService>(TYPES.MovieService)
    .to(MovieService)
    .inSingletonScope();

export const createChildContainer = (req: IncomingMessage): Container => {
    const childContainer = container.createChild();

    childContainer
        .bind<Loaders>(TYPES.DataLoaders)
        .to(Loaders)
        .inSingletonScope();

    return childContainer;
};
