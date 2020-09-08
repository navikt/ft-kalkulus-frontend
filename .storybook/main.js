const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PACKAGES_DIR = path.resolve(__dirname, '../packages');
const CORE_DIR = path.resolve(__dirname, '../node_modules');
const IMAGE_DIR_BG = path.join(PACKAGES_DIR, '/prosess-beregningsgrunnlag/assets');
const IMAGE_DIR_FELLES = path.join(PACKAGES_DIR, '/felles/src/assets');

const CSS_DIR_FELLES = path.join(PACKAGES_DIR, '/felles/assets/styles');
const CSS_DIR_STORYBOOK = path.resolve(__dirname, './storyStyle.less');

module.exports = {
  stories: ['../packages/storybook/stories/*.stories.@(js|tsx)'],
  addons: ['@storybook/addon-docs/preset', '@storybook/addon-actions/register', '@storybook/addon-knobs/register'],
  webpackFinal: async (config, { configType }) => {
    //Fjern default svg-loader
    config.module.rules = config.module.rules.map( data => {
      if (/svg\|/.test(String(data.test))) {
        data.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;
      }
      return data;
    });

    config.devtool = 'cheap-module-eval-source-map';

    // Make whatever fine-grained changes you need
    config.module.rules = config.module.rules.concat({
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
      include: PACKAGES_DIR,
    }, {
      test: /\.(less|css)?$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: './',
          },
        }, {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: {
              localIdentName: '[name]_[local]_[contenthash:base64:5]',
            },
          },
        }, {
          loader: 'less-loader',
          options: {
            lessOptions: {
              modules: true,
              localIdentName: '[name]_[local]_[contenthash:base64:5]',
              modifyVars: {
                nodeModulesPath: '~',
                coreModulePath: '~',
              },
            },
          },
        }],
      include: [PACKAGES_DIR],
      exclude: [CSS_DIR_FELLES, CSS_DIR_STORYBOOK],
    }, {
      test: /\.(less)?$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: './',
          },
        }, {
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
          options: {
            lessOptions: {
              modifyVars: {
                nodeModulesPath: '~',
                coreModulePath: '~',
              },
            },
          },
        }],
      include: [CSS_DIR_FELLES, CSS_DIR_STORYBOOK, CORE_DIR],
    }, {
      test: /\.(svg)$/,
      issuer: {
        test: /\.less?$/
      },
      loader: 'file-loader',
      options: {
        esModule: false,
        name: '[name]_[hash].[ext]',
      },
      include: [IMAGE_DIR_BG, IMAGE_DIR_FELLES],
    }, {
      test: /\.(svg)$/,
      issuer: {
        test: /\.(jsx?|js?|tsx?|ts?)?$/
      },
      use: [{
        loader: '@svgr/webpack',
      },{
        loader: 'file-loader',
        options: {
          esModule: false,
          name: '[name]_[hash].[ext]',
        },
      }],
      include: [IMAGE_DIR_BG, IMAGE_DIR_FELLES],
    },{
      test: /\.(svg)$/,
      loader: 'file-loader',
      options: {
        esModule: false,
        name: '[name]_[hash].[ext]',
      },
      include: [CORE_DIR],
    });

    config.plugins.push(new MiniCssExtractPlugin({
      filename: 'style.css',
      ignoreOrder: true,
    }));

    config.resolve.extensions.push('.ts', '.tsx', '.less');

    // Return the altered config
    return config;
  },
};
