const path = require('path');
const STORIES_DIR = path.resolve(__dirname, '../packages/storybook/stories');

module.exports = async ({ config, mode }) => {
    const getRulesExceptBabelLoader = () =>
        config.module.rules.filter(
            rule => !(rule.use && rule.use.length && rule.use.find(({ loader }) => loader === 'babel-loader'))
        );

    const omitSvgHandling = () =>
        config.module.rules.map(data => {
            if (/svg\|/.test(String(data.test))) {
                data.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;
            }

            return data;
        });

    config.module.rules = omitSvgHandling();
    config.module.rules = getRulesExceptBabelLoader();
    config.module.rules.push(
        {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader'],
            include: path.resolve(__dirname, '../'),
        },
        {
            test: /\.(jsx?|js?|tsx?|ts?)$/,
            use: [
                { loader: 'cache-loader' },
                {
                    loader: 'thread-loader',
                    options: {
                        workers: process.env.CIRCLE_NODE_TOTAL || require('os')
                            .cpus() - 1,
                        workerParallelJobs: 50,
                    },
                },
                {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                    },
                },
            ],
            include: [/(packages)/],
        },
        {
            test: /\.stories\.js?$/,
            include: [STORIES_DIR],
            use: [
                {
                    loader: require.resolve('@storybook/source-loader'),
                },
            ],
            enforce: 'pre',
        },
        {
            test: /\.js$/,
            include: [/(.storybook)/],
            exclude: [/(packages)/, /(node_modules)/],
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                cacheDirectory: true,
            },
        },
        {
            test: /\.(svg)$/,
            loader: 'file-loader',
            options: {
                name: '[name]_[hash].[ext]',
            },
        }
    );

    config.resolve.extensions.push('.ts', '.tsx', '.less');
    return config;
};
