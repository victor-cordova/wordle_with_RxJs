const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
      Images: path.resolve("src", "static", "images"),
    }
  },

	devtool: 'inline-source-map',

  mode: "development",
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
        type: 'asset/resource',
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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
  ],
  devServer: {
    static: {
      directory: path.resolve('public'),
    },
    compress: true,
    port: 9000,
		historyApiFallback: true,
  },
};
