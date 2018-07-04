'use strict';
const utils = require('./utils');
const config = require('../config');
const signale = require('./logger');
const isProduction = process.env.NODE_ENV === 'production';

signale.info(`Vue loader run in ${process.env.NODE_ENV} env`);

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
