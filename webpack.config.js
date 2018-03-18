var debug = process.env.NODE_ENV.trim() !== "production";
var webpack = require('webpack');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//比UglifyJsPlugin好用多倍的压缩工具
var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

/*
 *Happy begin ******************************************
 *myhappy的加速度并不显著,可能需要电脑配置.但是命中cache后速度会翻倍.
 *主要的时间消耗是在js的转换上,就是babel-loader js,大概要23秒.
 *压缩时间大概是10秒.
 */
var HappyPack = require('happypack'),
  os = require('os'),
  happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
var myHappyPack = new HappyPack({
  loaders: [{
    // id: 'js',
    loader: 'babel-loader',
    threadPool: happyThreadPool,
    options: {
      cacheDirectory: true,
      presets: ['react', 'es2015', 'stage-0'],
      "plugins": [
        ["import", [{
          "libraryName": "antd",
          "libraryDirectory": "lib",
          "style": true
        }, {
          "libraryName": "antd-mobile",
          "libraryDirectory": "lib",
          "style": true
        }]],
      ],
    }
  }]
})

/*
 *Happy end ******************************************
 */

module.exports = {
  context: path.join(__dirname),
  devtool: debug ? "cheap-module-eval-source-map" : "inline-sourcemap",
  entry: {
    home: "./src/js/root.js",
    common: ['react-dom'], //'jquery', 'react', 'react-dom',// 这里将externals里随便填一个进来就行,就会自动全部合进来,但是空着不行
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      loader: 'HappyPack/loader',
      /*      query: {
              presets: ['react', 'es2015', 'stage-0'],
            }*/
    }, {
      test: /\.(less|css)$/,
      loader: 'style-loader!css-loader!less-loader'
    }, {
      test: /\.(png|jpg|svg)$/,
      loader: 'url-loader?limit=50000'
    }, ]
  },
  node: {
    fs: 'empty'
  },
  output: {
    path: __dirname + '/build',
    filename: debug ? '[name].js' : '[name]-[hash].js', // "./src/bundle.js"
  },
  plugins: debug ? [
    myHappyPack,
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('dev') }),
    new webpack.optimize.CommonsChunkPlugin({
      chunks: ['home'],
      filename: '[name].js',
      name: 'common'
    }),
  ] : [
    myHappyPack,
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production'), }),
    new webpack.optimize.CommonsChunkPlugin({
      chunks: ['home'],
      filename: '[name]-[hash].js',
      name: 'common'
    }),
    new HtmlWebpackPlugin({
      title: 'commonschunk_demo',
      filename: 'index.html',
      template: 'my-index.ejs',
    }),
    new CopyWebpackPlugin([{
      from: './src/css/main.css', //定义要拷贝的源目录   __dirname + ‘/src/public’
      to: __dirname + '/build/main.css', //定义要拷贝的目标目录  __dirname + ‘/dist’
    }]),
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS: {
        output: {
          comments: false
        },
        compress: {
          warnings: false
        }
      }
    }),
    //   new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
  externals: {
    'jquery': 'jQuery',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
  },
  devServer: {
    hot: true, // 热重载
    inline: true, // 启用inline 模式
    port: 8083,
    host: '192.168.1.122',
    proxy: {
      '/api': {
        target: "https://www.mymengqiqi.com/",
        pathRewrite: { '^/api': '' },
        secure: false, // 处理https
        changeOrigin: true
      }
    }
  },

};