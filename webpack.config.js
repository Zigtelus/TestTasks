const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: ["@babel/polyfill", "./src/index.tsx"],
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js"
  },
  devServer: {
    port: 8090,
    hot: false
  },
  plugins: [
    new HtmlWebpackPlugin({template: "./src/index.html"}),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: ["style-loader", "css-loader", "less-loader"]
      },
      {
        test: /\.(jpg|jpeg|png|svg)/,
        use: ["file-loader"]
      },
      {
        test: /\.m?js$|\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.m?ts$|\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react', "@babel/preset-typescript"]
            },
          },
          {
            loader: "ts-loader"
          }
        ]
      }

    ]
  }
}