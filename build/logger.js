const signale = require('signale');

// 打印器
signale.config({
  displayFilename: process.env.NODE_ENV === 'production'
});

module.exports = signale;
