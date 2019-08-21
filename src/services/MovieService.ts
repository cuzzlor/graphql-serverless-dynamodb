import { DataMapper } from '@aws/dynamodb-data-mapper';
import { inject, injectable } from 'inversify';
import { Movie } from '../data/movies/Movie';
import { MovieQueryInput } from '../data/movies/MovieQueryInput';
import { TYPES } from '../TYPES';
import { DynamoDbService } from './DynamoDbService';

@injectable()
export class MovieService extends DynamoDbService {
    constructor(@inject(TYPES.DataMapper) mapper: DataMapper) {
        super(mapper);
    }

    public async query(input: MovieQueryInput): Promise<Movie[]> {
        const results = new Array<Movie>();
        for await (const movie of this.mapper.query(Movie, input)) {
            results.push(movie);
        }
        return results;
    }
}
