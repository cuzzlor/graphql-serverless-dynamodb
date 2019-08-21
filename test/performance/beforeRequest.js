const path = require('path');
const fs = require('fs');

exports.beforeRequest = (requestParams, context, ee, next) => {
    context.vars.query = loadQuery(context.vars.queryPath);
    return next();
};

const queries = {};

const loadQuery = relativePath => {
    if (!queries[relativePath]) {
        const fullPath = path.join(__dirname, relativePath);
        queries[relativePath] = fs.readFileSync(fullPath, 'utf8');
    }
    return queries[relativePath];
};
