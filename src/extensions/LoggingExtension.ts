import { GraphQLExtension } from 'apollo-server';
import { GraphQLRequestContext } from 'apollo-server-core';
import { Request } from 'apollo-server-env';
import config from 'config';
import { DocumentNode, print } from 'graphql';
import { EndHandler, GraphQLResponse } from 'graphql-extensions';
import _ from 'lodash';
import { Logger } from 'winston';
import { GraphQLContext } from '../GraphQLContext';
import { TYPES } from '../TYPES';

export class LoggingExtension extends GraphQLExtension<GraphQLContext> {
    public requestDidStart?(options: {
        request: Pick<Request, 'url' | 'method' | 'headers'>;
        queryString?: string;
        parsedQuery?: DocumentNode;
        operationName?: string;
        variables?: { [key: string]: any };
        persistedQueryHit?: boolean;
        persistedQueryRegister?: boolean;
        context: GraphQLContext;
        requestContext: GraphQLRequestContext<GraphQLContext>;
    }): EndHandler | void {
        const query = options.queryString || print(options.parsedQuery!);
        if (!query.startsWith('query IntrospectionQuery')) {
            const logger = options.context.container.get<Logger>(TYPES.RequestContextLogger);
            logger.info('graphql query', { query });
        }
    }

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
            config.get<boolean>('graphql.logTracing') &&
            response.extensions &&
            response.extensions.tracing &&
            response.extensions.tracing.execution.resolvers.length
        ) {
            const tracing = _.clone(response.extensions.tracing);
            delete tracing.execution;
            logger.verbose('graphql trace', { tracing });
        }

        logger.close();
    }
}
