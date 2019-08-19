import { ApolloServer } from 'apollo-server-lambda';
// tslint:disable-next-line: no-implicit-dependencies
import { APIGatewayEventRequestContext, APIGatewayProxyEvent } from 'aws-lambda';
import { createChildContainer } from './container.config';
import { serverConfigFactory } from './server.config';

const server = new ApolloServer(
    serverConfigFactory(
        ({
            event,
            context,
        }: {
            event: APIGatewayProxyEvent | APIGatewayProxyEvent;
            context: APIGatewayEventRequestContext;
        }) => {
            // logger.debug('creating context for apollo-server-lambda handler', { event, context });
            return {
                container: createChildContainer(),
                event,
                context,
            };
        },
    ),
);

export const handler = server.createHandler({
    cors: {
        origin: true,
        credentials: true,
    },
});
