import { ApolloServer } from 'apollo-server-lambda';
// tslint:disable-next-line: no-implicit-dependencies
import { APIGatewayEventRequestContext, APIGatewayProxyEvent } from 'aws-lambda';
import config from 'config';
import { createChildContainer } from './container.config';
import { GraphQLContext } from './GraphQLContext';
import { logger } from './logger.config';
import { serverConfigFactory } from './server.config';

logger.info(`loading new instance configured for '${config.util.getEnv('NODE_ENV')}' environment`);

const server = new ApolloServer(
    serverConfigFactory(
        ({
            event,
            context,
        }: {
            event: APIGatewayProxyEvent | APIGatewayProxyEvent;
            context: APIGatewayEventRequestContext;
        }): GraphQLContext => {
            const requestInfo = {
                requestId: event.requestContext.requestId,
                host: event.headers['x-forwarded-for'],
                method: event.httpMethod,
                path: event.path,
            };

            const container = createChildContainer({
                requestContextLoggerOptions: { defaultMeta: { requestInfo } },
            });

            return {
                container,
                requestInfo,
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
