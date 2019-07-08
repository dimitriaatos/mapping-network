const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  watch: true,
  entry: [
    path.resolve(__dirname, './src/renderer/index.js'),
  ],
  output: {
    filename: 'index.js',
    publicPath: '/',
    path: path.resolve(__dirname, './dist'),
  },
  node: {
    fs: 'empty'
  },
  target: 'electron-renderer',
  plugins: [
  ],
}