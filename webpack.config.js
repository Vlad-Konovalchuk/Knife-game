const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const path = require('path');
const dist = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: dist,
    compress: false,
    port: 8080,
    historyApiFallback: true
  },
  entry: ['babel-polyfill', './src/Game.js'],
  output: {
    path: dist,
    filename: 'game.js'
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[ext]',
            publicPath: '/'
          }
        }
      }
    ]
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  plugins: [new HtmlWebpackPlugin({
    inject: true,
    template: 'public/index.html'
  })]
};