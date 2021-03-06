const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    scanner: ['babel-polyfill', './src/scanner.js'],
    locations: './src/locations.js',
    generator: './src/generator.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: 'public',
    filename: '[name]-bundle.js'
  },
  serve: {
    dev: {
      publicPath: '/public/'
    }
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }, {
        test: /\.(patt|jpg|png)$/,
        exclude: /(node_modules)/,
        use: [ 'file-loader' ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './locations.html',
      filename: 'locations.html'
    }),
    new CopyWebpackPlugin([
      {
        from: 'static',
        to: 'static',
        toType: 'dir'
      }
    ])
  ]
};
