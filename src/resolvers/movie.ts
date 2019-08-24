import { Container } from 'inversify';
import { Loaders } from '../data/Loaders';
import { MovieInput } from '../model/MovieInput';
import { MovieKeyInput } from '../model/MovieKeyInput';
import { MovieService } from '../services/MovieService';
import { TYPES } from '../TYPES';

export const resolvers = {
    Query: {
        movies: (source: any, movieKey: MovieKeyInput, { container }: { container: Container }) =>
            container.get<Loaders>(TYPES.DataLoaders).movieLoader.load(movieKey),
    },
    Mutation: {
        putMovie: (source: any, { movie }: { movie: MovieInput }, { container }: { container: Container }) =>
            container.get<MovieService>(TYPES.MovieService).put(movie),
        updateMovie: (source: any, { movie }: { movie: MovieInput }, { container }: { container: Container }) =>
            container.get<MovieService>(TYPES.MovieService).update(movie),
        deleteMovies: (source: any, movieKey: MovieKeyInput, { container }: { container: Container }) =>
            container.get<MovieService>(TYPES.MovieService).delete(movieKey),
    },
};
