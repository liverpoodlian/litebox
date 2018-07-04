const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use:  [  
          'style-loader', 
          MiniCssExtractPlugin.loader, 
          'css-loader',
          {
            loader: 'clean-css-loader',
            options: {
              compatibility: "ie9",
              level: 2
            }
          }, 
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('autoprefixer')()
              ]
            }
          }, 
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(ttf|otf)$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
                publicPath: 'fonts/'
            }
        }]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/'
            },
          },
        ],
      }
    ]
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
  },

  plugins: [ 
    new CleanWebpackPlugin('dist/*.*', [{}]),
    new MiniCssExtractPlugin({
      filename: 'style-[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new WebpackMd5Hash()
  ],
  
  devServer: {
    contentBase: __dirname + '/dist',
    compress: true,
    port: 9000,
    index: 'index.html',
    watchContentBase: true
  }
};