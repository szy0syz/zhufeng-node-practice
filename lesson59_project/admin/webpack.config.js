var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: { // 解析配置
    root: ['./src'], //设置项目webpack解析的起始根据路为src文件夹开始,如果webpack找模块只会去src里去找
    extensions: ['', 'js', 'css'] //webpack后缀解析，如果没加js或css会自动识别


  }
}