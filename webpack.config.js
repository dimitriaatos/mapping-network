const path = require('path')

const base = {
  mode: 'development',
  devtool: 'source-map',
  watch: true,
  node: {
    fs: 'empty'
  },
  target: 'electron-renderer',
},
index = {
  name: 'index',
  entry: [
    path.resolve(__dirname, './src/renderer/index.js'),
  ],
  output: {
    filename: 'index.js',
    publicPath: '/',
    path: path.resolve(__dirname, './dist'),
  },
},
ontop = {
  name: 'ontop',
  entry: [
    path.resolve(__dirname, './src/renderer/ontop.js'),
  ],
  output: {
    filename: 'ontop.js',
    publicPath: '/',
    path: path.resolve(__dirname, './dist'),
  },
},
makeConfig = io => Object.assign({}, base, io)

module.exports = [makeConfig(index), makeConfig(ontop)]