import { GraphQLExtension } from 'apollo-server';
import { GraphQLResponse } from 'graphql-extensions';
import { Logger } from 'winston';
import { GraphQLContext } from '../GraphQLContext';
import { TYPES } from '../TYPES';

export class LoggingExtension extends GraphQLExtension<GraphQLContext> {
    public willSendResponse?({
        context,
        graphqlResponse: response,
    }: {
        graphqlResponse: GraphQLResponse;
        context: GraphQLContext;
    }): void | { graphqlResponse: GraphQLResponse; context: GraphQLContext } {
        const logger = context.container.get<Logger>(TYPES.RequestContextLogger);

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
