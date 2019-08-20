import { attribute, hashKey, rangeKey, table } from '@aws/dynamodb-data-mapper-annotations';
import { MovieInfo } from './MovieInfo';

@table('movies')
export class Movie {
    @hashKey()
    public title!: string;

    @rangeKey()
    public year!: number;

    @attribute()
    public info!: MovieInfo;
}
