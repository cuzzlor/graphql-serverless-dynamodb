import { attribute } from '@aws/dynamodb-data-mapper-annotations';

export class MovieInfo {
    @attribute({ memberType: 'String' })
    public directors!: Set<string>;

    @attribute({ attributeName: 'release_date' })
    public releaseDate!: string;

    @attribute()
    public rating!: number;

    @attribute({ memberType: 'String' })
    public genres!: Set<string>;

    @attribute({ attributeName: 'image_url' })
    public imageUrl!: string;

    @attribute()
    public plot!: string;

    @attribute()
    public rank!: number;

    @attribute({ attributeName: 'running_time_secs' })
    public runningTimeSecs!: number;

    @attribute({ memberType: 'String' })
    public actors!: Set<string>;
}
