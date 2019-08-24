import { attribute } from '@aws/dynamodb-data-mapper-annotations';
import { MovieInfoInput } from '../../model/MovieInfoInput';

export class MovieInfo implements MovieInfoInput {
    @attribute({ memberType: { type: 'String' } })
    public directors!: string[];

    @attribute({ attributeName: 'release_date' })
    public releaseDate!: string;

    @attribute()
    public rating!: number;

    @attribute({ memberType: { type: 'String' } })
    public genres!: string[];

    @attribute({ attributeName: 'image_url' })
    public imageUrl!: string;

    @attribute()
    public plot!: string;

    @attribute()
    public rank!: number;

    @attribute({ attributeName: 'running_time_secs' })
    public runningTimeSecs!: number;

    @attribute({ memberType: { type: 'String' } })
    public actors!: string[];
}
