'use strict';

const { resolve } = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const INDEX_TEMPLATE = resolve('./src/index.html');
const TSCONFIG = resolve(__dirname, 'tsconfig.json');

const commonConfig = merge([
  {
    entry: './src/index.ts',
    output: {
      path: resolve('./dist'),
      filename: '[name].[chunkhash:8].js'
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'esbuild-loader',
          options: {
            loader: 'ts',
            target: 'es2017'
          }
        }
      ]
    }
  }
]);

const developmentConfig = merge([
  {
    devtool: 'cheap-module-source-map',
    mode: 'development',
    plugins: [
      new HtmlWebpackPlugin({
        template: INDEX_TEMPLATE
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: TSCONFIG
        }
      })
    ],
    devServer: {
      contentBase: resolve('src'),
      compress: true,
      overlay: true,
      port: 3000,
      host: '0.0.0.0',
      historyApiFallback: true,
      proxy: {
        '/api': 'http://localhost:8000'
      }
    }
  }
]);

const productionConfig = merge([
  {
    devtool: 'nosources-source-map',
    mode: 'production',
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: resolve('src/demos.json'),
            to: resolve('dist')
          }
        ]
      }),
      new HtmlWebpackPlugin({
        template: INDEX_TEMPLATE,
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          minifyCSS: true,
          minifyJS: true
        }
      })
    ]
  }
]);

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    return merge(commonConfig, developmentConfig);
  }

  return merge(commonConfig, productionConfig);
};
