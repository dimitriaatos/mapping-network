const webpack = require('webpack'),
  babel = require('babel-loader'),
  path = require('path'),
  MaxJsui = require('./max-jsui-plugin.js')

module.exports = {
  mode: 'production',
  optimization: {
    minimize: false,
  },
  // watch: true,
  entry: {
    filename: './src/mapnet.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'mapnet.dist.js'
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      use: [{
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env']
        }
      }]
    }]
  },
  plugins: [
    new MaxJsui({
      variables: ['scan', 'ui', 'mapping', 'param'],
      message: 'This code is not meant to be human readable.'
    })
  ]
}
