import { ApolloServer } from 'apollo-server';
import config from 'config';
import * as fs from 'fs';
import { IncomingMessage } from 'http';
import * as path from 'path';
import { createChildContainer } from './container.config';
import { logger } from './logger.config';
import { resolvers as movieResolvers } from './resolvers/movie';

const typeDefs = fs.readFileSync(path.join(__dirname, 'schema/schema.graphql'), 'utf8');

const server = new ApolloServer({
    typeDefs,
    resolvers: [movieResolvers],
    context: ({ req }: { req: IncomingMessage }) => ({
        container: createChildContainer(req),
    }),
    debug: config.get<boolean>('graphql.debug'),
    tracing: config.get<boolean>('graphql.tracing'),
});

server.listen({ port: process.env.PORT }).then(({ url }) => {
    logger.info(`Server ready at ${url}`);
});
