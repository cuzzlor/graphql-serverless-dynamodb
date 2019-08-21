import axios from 'axios';

export default class GraphQLClient {
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    public async query<TVariables>(query: string, variables?: TVariables): Promise<any> {
        return axios.post(this.url, { query, variables }).then(response => response.data);
    }
}
