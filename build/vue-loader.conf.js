'use strict';
const utils = require('./utils');
const config = require('../config');
const chalk = require('chalk');
const isProduction = process.env.NODE_ENV === 'production';

console.log(chalk.green(`Vue loader run in ${process.env.NODE_ENV} env`));

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction ? config.build.productionSourceMap : config.dev.cssSourceMap,
    extract: isProduction
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
};
