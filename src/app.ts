import { ApolloServer } from 'apollo-server';
import { IncomingMessage } from 'http';
import { createChildContainer } from './container.config';
import { logger } from './logger.config';
import { serverConfigFactory } from './server.config';

const server = new ApolloServer(
    serverConfigFactory(({ req }: { req: IncomingMessage }) => {
        return {
            container: createChildContainer(),
            req,
        };
    }),
);

server.listen({ port: process.env.PORT }).then(({ url }) => {
    logger.info(`Server ready at ${url}`);
});
