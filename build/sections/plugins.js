import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackBar from 'webpackbar';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import resolveCwd from './resolveCwd';
import { envEnum, prefixCls, baseAPiMap } from './consts';

const env = process.env.NODE_ENV || envEnum.development;

const apiEnv = process.env.API_ENV || envEnum.development;

const definitions = {
  'process.env.NODE_ENV': JSON.stringify(env),
  NODE_ENV: JSON.stringify(env),
  __STATIC__: env === envEnum.static,
  __DEV__: env === envEnum.development,
  __PRODUCTION__: env === envEnum.production,
  __TESTING__: env === envEnum.test,
  __PREFIX_CLS__: JSON.stringify(prefixCls),
  __BASE_URL__: JSON.stringify(baseAPiMap[apiEnv]),
};

const webpackBar = new WebpackBar();
const definePlugin = new webpack.DefinePlugin(definitions)
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  chunks: ['index'],
  title: ' mine-profit',
  template: resolveCwd('src/index.html'),
  filename: 'index.html',
  inject: true
})

const htmlWebpackPlugin2 = new HtmlWebpackPlugin({
  chunks: ['upgrade'],
  title: ' mine-profit2',
  template: resolveCwd('src/upgrade.html'),
  filename: 'upgrade.html'
})

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: '[name].[contenthash:8].css',
  chunkFilename: '[id].[contenthash:8].css',
})

const cleanWebpackPlugin = new CleanWebpackPlugin();
// const bundleAnalyzerPlugin = new BundleAnalyzerPlugin();

const plugins = [
  cleanWebpackPlugin,
  htmlWebpackPlugin,
  htmlWebpackPlugin2,
  definePlugin,
  webpackBar,
  // bundleAnalyzerPlugin
];

if (env === 'production') {
  plugins.push(miniCssExtractPlugin)
}

export default plugins;
