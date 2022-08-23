const path = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].[contenthash].js",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".ts"],
    alias: {
      Images: path.resolve(__dirname, "src", "static", "images"),
    }
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(m?js)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader"
        }
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,
        "css-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset', //
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: "body", //Sirve para indicar en que lugar se colocará el archivo .js
  //en el body o en el head.
      template: "./public/index.html", //Se le indica que archivo de html va a empaquetar
      filename: "./index.html", //Se indica como se llamará el archivo que luego del empa
  //quetamiento.
    }),
    new MiniCssExtractPlugin({
      filename: "./static/[name].[contenthash].css",
    }),
    new ImageMinimizerPlugin({
      minimizer: {
        options: {
          // Lossless optimization with custom option
          // Feel free to experiment with options for better result for you
          plugins: [
            // ["gifsicle", { interlaced: true }],
            ["jpegtran", { progressive: true }],
            ["optipng", { optimizationLevel: 5 }],
            // Svgo configuration here https://github.com/svg/svgo#configuration
          ],
        },
      }
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
  },
};
