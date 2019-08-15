import { Config } from 'apollo-server';
import { Context, ContextFunction } from 'apollo-server-core';
import config from 'config';
import * as fs from 'fs';
import * as path from 'path';
import { resolvers as movieResolvers } from './resolvers/movie';

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema/schema.graphql'), 'utf8');

export const serverConfigFactory = (context?: Context | ContextFunction): Config => ({
    typeDefs,
    resolvers: [movieResolvers],
    context,
    debug: config.get<boolean>('graphql.debug'),
    tracing: config.get<boolean>('graphql.tracing'),
});
