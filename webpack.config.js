const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  //配置绝对路径
  context: path.resolve(__dirname, "src"),
  // 让 webpack 知道以哪个模块为入口，做依赖收集
  // 具体参考 https://webpack.js.org/concepts/#entry
  devServer: {
    publicPath: '/',
    host: 'localhost',
    port: 8081
  },
  devtool: 'inline-source-map',
  entry: './index.jsx',
  // 告诉 webpack 打包好的文件存放在哪里，以及怎么命名
  // 具体参考 https://webpack.js.org/concepts/#output
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },
  module: {
    // 使用 babel-loader 编译 es6/7/8 和 jsx 语法
    // 注意：这里没有配置 preset，而是在 .babelrc 文件里面配置
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: path.resolve(__dirname, "node_modules"),
        use: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          },
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|otf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".jsx"],
    alias: {
      src: path.resolve(__dirname, "src"),
      page: path.resolve(__dirname, "src/page"),
      store: path.resolve(__dirname, "src/store"),
      config: path.resolve(__dirname, "src/config"),
      static: path.resolve(__dirname, "src/static"),
      components: path.resolve(__dirname, "src/components"),
    }
  },
  plugins: [
    // 这里我们通常想要指定自己的 html 文件模板，也可以指定生成的 html 的文件名
    // 如果不传参数，会有一个默认的模板文件
    // 具体参考 https://github.com/jantimon/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: '../index.html',
      title: "SIPT项目管理系统",
      // 关闭该插件默认的注入css、js，完全由模版控制
      inject: false,
      filename: 'index.html',
    }),
  ],
  //去掉bundle.js的 console.log
  //new webpack.optimize.UglifyJsPlugin已经被remove了
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true
          },
          output: {
            // 去掉注释内容
            comments: false
          },
          extractComments: false,
          sourceMap: true
        }

      })
    ]
  }
}