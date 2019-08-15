import { Container } from 'inversify';
import { Loaders } from '../data/Loaders';
import { MovieQueryInput } from '../data/movies/MovieQueryInput';
import { TYPES } from '../TYPES';

export const resolvers = {
    Query: {
        movies: (source: any, queryInput: MovieQueryInput, { container }: { container: Container }) =>
            container.get<Loaders>(TYPES.DataLoaders).movieLoader.load(queryInput),
    },
};
