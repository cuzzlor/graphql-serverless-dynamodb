import { GraphQLExtension } from 'apollo-server';
import { GraphQLResponse } from 'graphql-extensions';
import { logger } from '../logger.config';

export class LoggingExtension<TContext = any> extends GraphQLExtension<TContext> {
    public willSendResponse?({
        context,
        graphqlResponse: response,
    }: {
        graphqlResponse: GraphQLResponse;
        context: TContext;
    }): void | { graphqlResponse: GraphQLResponse; context: TContext } {
        if (response.errors) {
            logger.error('graphql errors', { errors: response.errors });
        }
        if (
            response.extensions &&
            response.extensions.tracing &&
            response.extensions.tracing.execution.resolvers.length
        ) {
            logger.verbose('graphql trace', { tracing: response.extensions.tracing });
        }
    }
}
