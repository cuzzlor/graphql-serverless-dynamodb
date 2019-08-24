import { DataMapper } from '@aws/dynamodb-data-mapper';
import { inject, injectable } from 'inversify';
import { Movie } from '../data/movies/Movie';
import { MovieInput } from '../model/MovieInput';
import { MovieKeyInput } from '../model/MovieKeyInput';
import { TYPES } from '../TYPES';
import { DynamoDbService } from './DynamoDbService';

@injectable()
export class MovieService extends DynamoDbService {
    constructor(@inject(TYPES.DataMapper) mapper: DataMapper) {
        super(mapper);
    }

    public async query(input: MovieKeyInput): Promise<Movie[]> {
        const results = new Array<Movie>();
        for await (const movie of this.mapper.query(Movie, input)) {
            results.push(movie);
        }
        return results;
    }

    public async put(movie: MovieInput): Promise<Movie> {
        return this.mapper.put(Object.assign(new Movie(), movie));
    }

    public async update(movie: MovieInput): Promise<Movie> {
        return this.mapper.update(Object.assign(new Movie(), movie));
    }

    public async delete(input: MovieKeyInput): Promise<Movie | undefined> {
        return this.mapper.delete(Object.assign(new Movie(), input), { returnValues: 'ALL_OLD' });
    }
}
