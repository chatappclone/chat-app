const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv').config();

module.exports = () => {
  const envKeys = Object.keys(process.env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(process.env[next]);
    return prev;
  }, {});

  return {
    entry: './src/index.js',
    devtool: 'source-map',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'static')
    },
    plugins: [
      new webpack.DefinePlugin(envKeys)
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: require.resolve('babel-loader')
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: "style-loader"
            }, {
              loader: "css-loader"
            }, {
              loader: "sass-loader"
            }
          ]
        }
      ]
    }
  };
}
