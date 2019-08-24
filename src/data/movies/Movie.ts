import { attribute, hashKey, rangeKey, table } from '@aws/dynamodb-data-mapper-annotations';
import { MovieInput } from '../../model/MovieInput';
import { MovieKeyInput } from '../../model/MovieKeyInput';
import { MovieInfo } from './MovieInfo';

@table('movies')
export class Movie implements MovieInput, MovieKeyInput {
    @hashKey()
    public title!: string;

    @rangeKey()
    public year!: number;

    @attribute()
    public info!: MovieInfo;
}
