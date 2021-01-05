module.exports = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { babelrc: true },
      },
      {
        test: /\.(html)$/,
        loader: 'html-loader',
        options: {
          attrs: [':data-src']
        }
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
}