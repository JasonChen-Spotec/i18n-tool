import resolveCwd from './resolveCwd';

const output = {
  publicPath: '/',
  path: resolveCwd('dist'),
  filename: '[name].[contenthash:8].js',
  chunkFilename: '[name].[contenthash:8].async.js'
}

module.exports = output;
