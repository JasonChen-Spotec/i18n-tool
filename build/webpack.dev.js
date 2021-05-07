import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import internalIp from 'internal-ip';
import colors from 'colors';
import plugins from './sections/plugins';
import getWebpackCommonConfig from './sections/webpackCommonConfig';
import entry from './sections/entry';
import output from './sections/output';
import optimization from './sections/optimization';

import('./i18n')

const isDev = process.env.NODE_ENV === 'development';
const port = isDev ? 6701 : 7502;

const webpackConfig = {
    devtool: 'source-map',
    entry,
    output,
    module: {
      rules: getWebpackCommonConfig.getLoaders().concat(getWebpackCommonConfig.getStyleLoaders(false)),
    },
    resolve: getWebpackCommonConfig.resolve,
    plugins,
    mode: 'development',
    optimization,
    cache: {
      // 1. 将缓存类型设置为文件系统
      type: 'filesystem',

      buildDependencies: {
        // 2. 将你的 config 添加为 buildDependency，以便在改变 config 时获得缓存无效
        config: [__filename],

        // 3. 如果你有其他的东西被构建依赖，你可以在这里添加它们
        // 注意，webpack、加载器和所有从你的配置中引用的模块都会被自动添加
      },
    },
    devServer: {
      compress: false,
      historyApiFallback: true,
      noInfo: true,
      open: false,
      port
    }
};

const compiler = Webpack(webpackConfig);
const devServerOptions = webpackConfig.devServer;
const server = new WebpackDevServer(compiler, devServerOptions);

server.listen(port, '0.0.0.0', () => {
  console.log('\nStarting server on: ')
  console.log(colors.green(`\thttp://localhost:${port}`));
  console.log(colors.green(`\thttp://${internalIp.v4.sync()}:${port}`));
});
