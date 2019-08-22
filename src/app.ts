import { ApolloServer } from 'apollo-server';
import { IncomingMessage } from 'http';
import { parse } from 'url';
import uuid from 'uuid';
import { createChildContainer } from './container.config';
import { GraphQLContext } from './GraphQLContext';
import { logger } from './logger.config';
import { serverConfigFactory } from './server.config';

const server = new ApolloServer(
    serverConfigFactory(
        ({ req }: { req: IncomingMessage }): GraphQLContext => {
            const requestInfo = {
                requestId: uuid.v4(),
                host: req.headers.host,
                method: req.method,
                path: parse(req.url!).pathname,
            };

            return {
                container: createChildContainer({ requestContextLoggerOptions: { defaultMeta: { requestInfo } } }),
                requestInfo,
            };
        },
    ),
);

server.listen({ port: process.env.PORT }).then(({ url }) => {
    logger.info(`server ready at ${url}`);
});
