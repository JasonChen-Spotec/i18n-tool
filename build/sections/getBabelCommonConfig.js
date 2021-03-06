
module.exports = () => {
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-typeof-symbol',
    [
      '@babel/plugin-transform-runtime',
      {
        help: false,
      },
    ],
    ["import", {
      "libraryName": "antd",
      "style": process.env.NODE_ENV !== 'test'
    }, 'antd'],

    // ["import", {
    //   "libraryName": "ahooks",
    //   "camel2DashComponentName": false,
    //   "style": false
    // }, 'ahooks']
  ];

  return {
    babelrc: false,
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          "corejs": 3,
          // "loose": true
        },
      ],
      '@babel/preset-react',
    ],
    plugins,
  };
};

