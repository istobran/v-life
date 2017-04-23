var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'build.js'
  },
  resolve: {
    extensions: [
      '.js', '.coffee',
      '.html', '.njk', '.vue',
      '.css', '.scss', '.less',
      '.json', '.yml'
    ],
    modules: [
      path.resolve(__dirname, "src"),
      "node_modules"
    ],
    alias: {
      'src': path.resolve(__dirname, 'src'),
      'scss': path.resolve(__dirname, 'src/assets/scss'),
      'assets': path.resolve(__dirname, 'src/assets/'),
      'components': path.resolve(__dirname, 'src/components')
    }
  },
  resolveLoader: {
    modules: ['node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|webp)$/,
        loader: 'url-loader',
        query: {
          limit: 8192,
          name: 'images/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    //HtmlWebpackPlugin，模板生成相关的配置，每个对应一个页面的配置，有几个写几个
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
      favicon: './src/assets/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
      filename: './index.html', //生成的html存放路径，相对于path
      template: './index.html', //html模板路径
      inject: 'body', //js插入的位置，true/'head'/'body'/false
      hash: false, //为静态资源生成hash值
      minify: { //压缩HTML文件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true //删除空白符与换行符
      }
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('autoprefixer')({
            browsers: ['last 7 versions']
          })
        ],
        vue: {
          loaders: {
            sass: "vue-style-loader!css-loader!postcss-loader!sass-loader?indentedSyntax",
            scss: "vue-style-loader!css-loader!postcss-loader!sass-loader"
          }
        }
      }
    })
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}
