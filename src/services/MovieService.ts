import { DataMapper, QueryParameters } from '@aws/dynamodb-data-mapper';
import { inject, injectable } from 'inversify';
import { Movie } from '../data/movies/Movie';
import { MovieQueryInput } from '../data/movies/MovieQueryInput';
import { TYPES } from '../TYPES';

@injectable()
export class MovieService {
    private mapper: DataMapper;
    constructor(@inject(TYPES.DataMapper) mapper: DataMapper) {
        this.mapper = mapper;
    }

    public async query(input: MovieQueryInput): Promise<Movie[]> {
        const queryInput: QueryParameters<Movie> = {
            valueConstructor: Movie,
            keyCondition: {
                hashKey: input.title,
                rangeKey: input.year,
            },
        };

        const iterator = this.mapper.query(queryInput);

        const results = new Array<Movie>();
        for await (const movie of iterator) {
            results.push(movie);
        }

        return results;
    }
}
