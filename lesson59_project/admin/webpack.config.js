var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  // resolve: { // 解析配置
  //   // root: ['./src'], //设置项目webpack解析的起始根据路为src文件夹开始,如果webpack找模块只会去src里去找
  //   extensions: ['js', 'css'] //webpack后缀解析，如果没加js或css会自动识别
  // },
  module: {
    rules: [
      {
        test: /\.jade$/,
        loader: 'jade-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
        exclude: /node_modules/
      },
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.js?$/,
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: "style-loader!css-loader!less-loader?strictMath&noIeCompat"
      },
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' }
    ]
  },
}