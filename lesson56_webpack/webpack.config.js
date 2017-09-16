module.exports = {
  entry: "./entry.js", // 设置打包的入口文件，每有一个键值对，就是一个入口文件
  output: { // 配置打包结果的输出
    path: __dirname,       // 定义输出的文件夹
    filename: "bundle.js" // 定义了打包结果文件的名称
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
  // 这尼玛好像是1.x版本的配置模板，关键我用的是3.6啊，真坑啊
  // module: {     // 定义模块的加载逻辑
  //   loaders: [  //  定义了一系列的加载器
  //     { test: /\.css$/, loader: "style-loader!css-loader!" } // 每当需要加载的文件匹配对`test`的正则时，就是后面的loader加载并转换
  //   ]
  // }
};