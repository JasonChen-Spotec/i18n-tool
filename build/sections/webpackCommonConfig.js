import fs from 'fs';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import lessToJS from 'less-vars-to-js';
import getBabelCommonConfig from './getBabelCommonConfig';
import resolve from './resolve';
import resolveCwd from './resolveCwd';
import { prefixCls } from './consts';

const babelConfig = getBabelCommonConfig();

const themeVariables = lessToJS(
  fs.readFileSync(resolveCwd('./src/shared/styles/themes/variables.less'), 'utf8')
);

export default {
  resolve,
  getLoaders() {
    return [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: resolveCwd('src'),
        loader: 'babel-loader',
        options: babelConfig
      },
      {
        test: /\.(eot|woff|woff2|ttf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'static/[name].[contenthash:8].[ext]',
          esModule: false,
        },

      },
      {
        test: /\.(png|jpe?g|gif|webp|ico)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'static/[name].[contenthash:8].[ext]',
              // outputPath: (url, resourcePath, context) => {
              //   const relativePath = path.relative(context, resourcePath);
              //   return relativePath.replace('src/', '');
              // },
              // name: '[name].[ext]?[contenthash:8]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      }
    ];
  },

  getStyleLoaders(extractCss) {
    const styleLoader = {
      loader: 'style-loader',
    };

    const postcssLoader = {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            [
              "autoprefixer",
              {
                // Options
              },
            ],
            'cssnano'
          ],
        }
       },
    };

    const getCSSLoader = (isCSSModules) => [
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          sourceMap: true,
          ...(isCSSModules
            ? {
                modules: {
                  localIdentName: '[local]___[contenthash:base64:5]',
                },
              }
            : {}),
        },
      },
      postcssLoader,
    ];

    const cssLoader = getCSSLoader();

    const getLessLoaders = (isCSSModules)=>([
      ...getCSSLoader(isCSSModules),
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            strictMath: false,
            modifyVars: {
              'ant-prefix': prefixCls,
              ...themeVariables
            },
            javascriptEnabled: true,
          },
        },
      }
    ])

    const modulesLessLoaders = getLessLoaders(true);
    const normalLessLoaders = getLessLoaders(false);

    if (extractCss) {
      const extractCssLoader = {
        loader: MiniCssExtractPlugin.loader,
        options: {
          // you can specify a publicPath here
          // by default it use publicPath in webpackOptions.output
        }
      }
      cssLoader.unshift(extractCssLoader);
      modulesLessLoaders.unshift(extractCssLoader);
      normalLessLoaders.unshift(extractCssLoader);
    } else {
      cssLoader.unshift(styleLoader);
      modulesLessLoaders.unshift(styleLoader);
      normalLessLoaders.unshift(styleLoader);
    }
    return [
      {
        test: /\.css$/,
        use: cssLoader,
      },
      {
        test: /\.less$/,
        include: resolveCwd('src'),
        use: modulesLessLoaders,
      },
      {
        test: /\.less$/,
        include: resolveCwd('node_modules'),
        use: normalLessLoaders,
      },
    ];
  },
};
