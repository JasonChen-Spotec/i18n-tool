import resolveCwd from './resolveCwd';

const output = {
  publicPath: '/',
  path: resolveCwd('app/public'),
  filename: '[name].[contenthash:8].js',
  chunkFilename: '[name].[contenthash:8].async.js'
}

module.exports = output;
