import * as path from 'path';
import { container } from './container.config';
import { Movie } from './data/movies/Movie';
import { DynamoDbService } from './services/DynamoDbService';
import { TYPES } from './TYPES';

container.get<DynamoDbService>(TYPES.DynamoDbService).batchLoadFromFile(path.join(__dirname, process.argv[2]), Movie);
