import { attribute } from '@aws/dynamodb-data-mapper-annotations';

export class MovieInfo {
    @attribute()
    public directors!: Set<string>;

    @attribute({ attributeName: 'release_date' })
    public releaseDate!: string;

    @attribute()
    public rating!: number;

    @attribute()
    public genres!: Set<string>;

    @attribute({ attributeName: 'image_url' })
    public imageUrl!: string;

    @attribute()
    public plot!: string;

    @attribute()
    public rank!: number;

    @attribute({ attributeName: 'running_time_secs' })
    public runningTimeSecs!: number;

    @attribute()
    public actors!: Set<string>;
}
