import { DataMapper } from '@aws/dynamodb-data-mapper';
import { equals } from '@aws/dynamodb-expressions';
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
        const queryInput: any = {
            valueConstructor: Movie,
            keyCondition: {
                hashKey: input.title,
            },
        };

        if (input.year) {
            queryInput.keyCondition.rangeKey = equals(input.year);
        }

        const iterator = this.mapper.query<Movie>(queryInput);

        const results = new Array<Movie>();
        for await (const movie of iterator) {
            results.push(movie);
        }

        return results;
    }
}
