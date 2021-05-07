const { presets, plugins } = require('./build/sections/getBabelCommonConfig')();

module.exports = {
  presets,
  plugins
};
