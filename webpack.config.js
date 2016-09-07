var path = require('path');
var webpack = require('webpack');
var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');
var dashboard = new Dashboard();

module.exports = {
  entry: path.resolve(__dirname, './app/index.js'),
  output: {
    path: path.resolve(__dirname, './build/src'),
    filename: 'bundle.js',
    publicPath:'src/'
  },
  externals: {
    "react": 'React',
    "react-dom":'ReactDOM'
  },
  /*plugins: [ new webpack.optimize.CommonsChunkPlugin("init.js") ],*/
  plugins: [
    new DashboardPlugin(dashboard.setData)
  ],
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      query: {
          presets: ['react', 'es2015']
        }
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    },{ 
      test: /\.(png|jpg)$/, 
      loader: 'url-loader?limit=25000' 
    }]
  }
};