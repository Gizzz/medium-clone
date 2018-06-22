const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  if (!env || !env.MODE) {
    throw new Error('webpack --env.MODE option is not specified');
  }

  const isDevMode = env.MODE === 'dev';
  const webpackMode = env.MODE === 'dev' ? 'development' : 'production';

  return {
    mode: webpackMode,
    entry: './src/client/app/index.jsx',
    output: {
      filename: 'js/bundle.[hash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.scss$/,
          use: [
            isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { sourceMap: true },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { sourceMap: true },
            },
          ],
        },
        {
          test: /\.woff$/,
          loader: 'file-loader',
          options: { name: 'fonts/[name].[ext]' },
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        template: './src/client/static/index.html',
      }),
      new CopyWebpackPlugin([
        { from: './src/client/static/favicon.ico' },
      ]),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
      }),
    ],
    devtool: 'source-map',
    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      port: 4000,
      historyApiFallback: true,
      proxy: {
        '/api': 'http://localhost:3000',
      },
    },
  };
};
