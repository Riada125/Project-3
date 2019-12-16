const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  entry: './frontend/src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('./backend/dist'),
    publicPath: '/'
  },
  node: {
    net: 'empty',      
    fs: 'empty',
    tls: 'empty'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      // {
      //   loader: 'react-svg-loader',
      //   options: {
      //     jsx: true 
      //   }
      // },
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      { test: /\.s(a|c)ss$/, loader: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.json$/, loader: 'json' },
      { test: /\.svg$/, loader: 'svg-inline-loader' },
      {
        test: /\.(jpg|png|gif)/, use: [{
          loader: 'url-loader', options: { limit: 5000 }
        }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve('./frontend/src'),
    hot: true,
    open: true,
    port: 8001,
    watchContentBase: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        secure: false
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'frontend/src/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ]
}
