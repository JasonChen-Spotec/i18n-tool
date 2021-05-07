
import webpack from "webpack";
import colors from 'colors';
import { envEnum } from './sections/consts';
import plugins from './sections/plugins';
import getWebpackCommonConfig from './sections/webpackCommonConfig';
import entry from './sections/entry';
import output from './sections/output';
import optimization from './sections/optimization';

const webpackConfig = {
  entry,
  output,
  module: {
    rules: getWebpackCommonConfig.getLoaders().concat(getWebpackCommonConfig.getStyleLoaders(true)),
  },
  resolve: getWebpackCommonConfig.resolve,
  plugins,
  mode: envEnum.production,
  performance: {
    hints:false
  },
  optimization,
  target: 'browserslist',
};

webpack(webpackConfig, (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.log(colors.red(err.details));
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.log(colors.red(info.errors));
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }

  console.log('info', stats.toString({ colors: true }));
});
