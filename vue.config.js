const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('Assets', resolve('src/assets'))
      .set('Components', resolve('src/components'))
      .set('Styles', resolve('src/assets/styles'))
      .set('Images', resolve('src/assets/images'))
      .set('Fonts', resolve('src/assets/fonts'))
      .set('Libs', resolve('src/assets/libs'))
      .set('Utils', resolve('src/utils'))
      .set('Plugins', resolve('src/plugins'));
    // config.module.rule('eslint').use('eslint-loader').options({
    //   fix: true,
    // });
  },
};
