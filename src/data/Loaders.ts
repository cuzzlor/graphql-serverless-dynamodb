import DataLoader from 'dataloader';
import { inject, injectable } from 'inversify';
import { MovieKeyInput } from '../model/MovieKeyInput';
import { MovieService } from '../services/MovieService';
import { TYPES } from '../TYPES';
import { Movie } from './movies/Movie';

@injectable()
export class Loaders {
    public movieLoader: DataLoader<MovieKeyInput, Movie[]>;

    constructor(@inject(TYPES.MovieService) movieService: MovieService) {
        this.movieLoader = new DataLoader<MovieKeyInput, Movie[]>(async (keys: MovieKeyInput[]) =>
            Promise.all(keys.map(key => movieService.query(key))),
        );
    }
}
