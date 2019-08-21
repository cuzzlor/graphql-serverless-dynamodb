const path = require('path');

module.exports = {
    entry: './src/lambda.ts',
    devtool: 'source-map',
    resolve: {
        extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, 'dist', 'src'),
        filename: 'lambda.js',
    },
    target: 'node',
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    configFile: 'webpack.tsconfig.json',
                },
            },
        ],
    },
    node: {
        __dirname: false,
    },
};
