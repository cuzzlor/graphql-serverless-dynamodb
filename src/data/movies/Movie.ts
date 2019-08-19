import { hashKey, rangeKey, table } from '@aws/dynamodb-data-mapper-annotations';

@table('Movies')
export class Movie {
    @hashKey()
    public title!: string;

    @rangeKey()
    public year!: number;
}
