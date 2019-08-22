import { Container } from 'inversify';
import { RequestInfo } from './RequestInfo';

export interface GraphQLContext {
    container: Container;
    requestInfo: RequestInfo;
}
