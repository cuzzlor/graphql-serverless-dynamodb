import config from 'config';

// tslint:disable-next-line:no-var-requires
export const approvals = require('approvals');

// for local config, use [home-dir]\.approvalsConfig

// config for all environments
approvals.configure({
    normalizeLineEndingsTo: '\r\n',
    errorOnStaleApprovedFiles: false,
    failOnLineEndingDifferences: false,
});

// for CI builds, use gitdiff for CLI reporting
if (config.util.getEnv('NODE_ENV') !== 'dev') {
    approvals.configure({
        reporters: ['gitdiff'],
    });
}
