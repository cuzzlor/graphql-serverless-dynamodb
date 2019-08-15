import config from 'config';
import * as dotenv from 'dotenv';

// first, load local env vars from .env
dotenv.config();

// do any further config bootstrapping here
// before it becomes immutable after the first read

// now we can load and export config
export default config;
