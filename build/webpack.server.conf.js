/**
 * 服务端渲的webpack配置文件
 */
const path = require('path');
const ExtractPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
// 用于服务端渲染的插件
const VueServerPlugin = require('vue-server-renderer/server-plugin');
const signale = require('./logger');

signale.info(`Webpack server conf run in ${process.env.NODE_ENV} env`);

let config;

config = merge(baseConfig, {
  target: 'node',
  entry: path.join(__dirname, '../src/server-entry.js'),
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        /**
         * 将style单独打包到一个css文件中
         * style-loader是会把css通过js去引用dom的方式插入到html中，会有dom操作，node端没有dom环境会报错
         */
        test: /\.styl/,
        use: ExtractPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        })
      },
      {
        /**
         * 将style单独打包到一个css文件中
         * style-loader是会把css通过js去引用dom的方式插入到html中，会有dom操作，node端没有dom环境会报错
         */
        test: /\.css/,
        use: ExtractPlugin.extract({
          use: 'css-loader'
        })
      }
    ]
  },
  plugins: [
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"' // vue服务端渲染的推荐做法
    }),
    new VueServerPlugin({
      // filename: 'vue-ssr-server-bundle.json' // 指定文件名
    })
  ],
  resolve: {
    alias: {
      'API': path.join(__dirname, '../src/api/server-api.js')
    }
  }
});

module.exports = config;
