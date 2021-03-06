import _ from 'lodash';
import * as path from 'path';
import { container } from '../src/container.config';
import { Movie } from '../src/data/movies/Movie';
import { DynamoDbService } from '../src/services/DynamoDbService';
import { TYPES } from '../src/TYPES';

container
    .get<DynamoDbService>(TYPES.DynamoDbService)
    .batchLoadFromFile(path.join(__dirname, process.argv[2]), Movie, movie => {
        movie.info = _.mapKeys(movie.info, (value, key) => _.camelCase(key)); // convert info snake case props to camelcase
        return movie;
    });
