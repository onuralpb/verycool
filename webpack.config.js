const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src/app.js"),
  stats: {
    colors: true,
  },
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: [
            [
              "@babel/plugin-transform-runtime",
              {
                regenerator: true,
              },
            ],
          ],
        },
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/assets/css/",
            },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(html)$/,
        loader: "html-loader",
      },
      {
        test: /\.(jp(e*)g|png|gif)$/,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
          outputPath: "assets/img/",
          publicPath: "/assets/img/",
        },
      },
      {
        test: /\.ico$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "/",
          publicPath: "/",
        },
      },
      {
        test: /\.(svg|webp)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "assets/svg/",
          publicPath: "/assets/svg/",
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?[a-z0-9=.]+)?$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "assets/font/",
          publicPath: "/assets/font/",
        },
      },
    ],
  },
  devServer: {
    port: 3100,
    open: true,
    hot: true,
    static: path.resolve(__dirname, "src"),
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "index.html"),
      filename: "index.html",
      favicon: "favicon.ico",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
};
