import * as fs from 'fs';

// tslint:disable-next-line: no-var-requires no-implicit-dependencies
const { gitDescribeSync } = require('git-describe');
fs.writeFileSync(process.argv[2], gitDescribeSync('.', { dirtySemver: false }));
