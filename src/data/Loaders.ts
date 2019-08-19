import DataLoader from 'dataloader';
import { inject, injectable } from 'inversify';
import { MovieService } from '../services/MovieService';
import { TYPES } from '../TYPES';
import { Movie } from './movies/Movie';
import { MovieQueryInput } from './movies/MovieQueryInput';

@injectable()
export class Loaders {
    public movieLoader: DataLoader<MovieQueryInput, Movie[]>;

    constructor(@inject(TYPES.MovieService) movieService: MovieService) {
        this.movieLoader = new DataLoader<MovieQueryInput, Movie[]>(async (keys: MovieQueryInput[]) =>
            Promise.all(keys.map(key => movieService.query(key))),
        );
    }
}
