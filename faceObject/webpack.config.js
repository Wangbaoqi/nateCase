
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {


  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],

  module: {
    rules: [
      { 
        test: /\.js$/, 
        use: 'babel-loader'
      }
    ]
  },


  devServer: {
    contentBase: path.join(__dirname, './dist'),
    open: true,
    port: 9000
  }
}