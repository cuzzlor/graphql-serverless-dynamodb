import { ApolloServer } from 'apollo-server-lambda';
import { createChildContainer } from './container.config';
import { serverConfigFactory } from './server.config';

const server = new ApolloServer(
    serverConfigFactory(({ event, context }) => ({
        container: createChildContainer(),
        event,
        context,
    })),
);

export const handler = server.createHandler({
    cors: {
        origin: true,
        credentials: true,
    },
});
