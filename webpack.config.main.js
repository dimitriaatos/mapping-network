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
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' 
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