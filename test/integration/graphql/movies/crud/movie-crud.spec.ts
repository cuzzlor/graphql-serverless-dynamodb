import { expect } from 'chai';
import config from 'config';
import { readFileSync } from 'fs';
import _ from 'lodash';
import { join } from 'path';
import { MovieInput } from '../../../../../src/model/MovieInput';
import GraphQLClient from '../../GraphQLClient';

// tslint:disable: only-arrow-functions no-unused-expression

describe('movie crud', function() {
    const client = new GraphQLClient(config.get<string>('integrationTest.url'));

    const movie: MovieInput = JSON.parse(readFileSync(join(__dirname, 'movie.json'), 'utf8'));
    const { title, year } = movie;
    const newDirectors = ['Some One', 'Another One'];

    const queries = {
        put: readFileSync(join(__dirname, 'queries/put.graphql'), 'utf8'),
        read: readFileSync(join(__dirname, '../../approvals/movies/query.graphql'), 'utf8'),
        update: readFileSync(join(__dirname, 'queries/update.graphql'), 'utf8'),
        delete: readFileSync(join(__dirname, 'queries/delete.graphql'), 'utf8'),
    };

    const deleteMovie = async function() {
        return client.query(queries.delete, { title, year });
    };

    this.beforeAll(deleteMovie);

    it('puts a movie', async function() {
        const response = await client.query(queries.put, { movie });

        expect(response.errors).to.be.undefined;
        expect(response.data.putMovie).to.deep.equal(movie);
    });

    it('updates a movie', async function() {
        const updated = _.cloneDeep(movie);
        updated.info.directors = newDirectors;

        const response = await client.query(queries.update, { movie: updated });

        expect(response.errors).to.be.undefined;
        expect(response.data.updateMovie).to.deep.equal(updated);
    });

    it('deletes a movie', async function() {
        await deleteMovie();

        const response = await client.query(queries.read, { title, year });

        expect(response.errors).to.be.undefined;
        expect(response.data.movies).to.be.empty;
    });
});
