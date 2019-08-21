import config from 'config';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { approvals } from '../../../approvals.config';
import GraphQLClient from '../GraphQLClient';

// tslint:disable:only-arrow-functions

export function approvalTestSubfolders(rootPath: string, responseScrubber?: (response: any) => void) {
    describe('graphql approvals', function() {
        const testFolders = fs
            .readdirSync(rootPath)
            .filter(folder => fs.lstatSync(path.join(rootPath, folder)).isDirectory());
        testFolders.forEach(folder => approvalTestFolderRecursively(path.join(rootPath, folder), responseScrubber));
    });
}

export function approvalTestFolderRecursively(fullPath: string, responseScrubber?: (response: any) => void) {
    before(async function() {
        this.client = new GraphQLClient(config.get<string>('integrationTest.url'));
    });

    const folder = fullPath.split(path.sep).reverse()[0];

    describe(folder, function() {
        const queryFile = path.join(fullPath, 'query.graphql');

        if (fs.existsSync(queryFile)) {
            const query = fs.readFileSync(queryFile, 'utf8');
            const dataFile = path.join(fullPath, 'data.json');

            if (fs.existsSync(dataFile)) {
                const data: { [key: string]: any } = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
                // tslint:disable-next-line:forin
                for (const key in data) {
                    const testName = path.normalize(key).replace(path.sep, '_');
                    createOneTest(fullPath, testName, query, data[key], responseScrubber);
                }
            } else {
                createOneTest(fullPath, folder, query, undefined, responseScrubber);
            }
        }

        // now recurse into subfolders
        const testFolders = fs
            .readdirSync(path.join(fullPath))
            .filter(subfolder => fs.lstatSync(path.join(fullPath, subfolder)).isDirectory());

        testFolders.forEach(subfolder =>
            approvalTestFolderRecursively(path.join(fullPath, subfolder), responseScrubber),
        );
    });
}

export function createOneTest(
    fullPath: string,
    testName: string,
    query: string,
    data?: any,
    responseScrubber?: (response: any) => void,
) {
    it(testName, async function() {
        const response: { data: any; errors: any[] } = await this.client.query(query, data);
        if (response.errors) {
            throw new Error(
                `GraphQL Errors:${os.EOL}\t` + response.errors.map(error => '\t' + JSON.stringify(error)).join(os.EOL),
            );
        }
        if (responseScrubber) {
            responseScrubber(response);
        }
        scrubExtensions(response);
        approvals.verifyAsJSON(fullPath, testName, response);
    });
}

export function scrubExtensions(response: any) {
    if (response.extensions) {
        delete response.extensions;
    }
}
