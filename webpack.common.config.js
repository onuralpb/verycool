const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
// const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = {
  stats: {
    colors: true,
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
        loaders: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "/assets/css/",
              reloadAll: true,
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
        loaders: "file-loader",
        options: {
          name: "[path][name].[ext]",
          outputPath: "assets/img/",
          publicPath: "/assets/img/",
        },
      },
      {
        test: /\.ico$/,
        loaders: "file-loader",
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
    publicPath: "/",
    open: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    watchContentBase: true,
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
    new BundleAnalyzerPlugin({
      analyzerMode: "disabled",
      generateStatsFile: false,
      statsOptions: { source: false },
    }),
    // new BrowserSyncPlugin({
    //   host: "localhost",
    //   port: 3100,
    //   server: { baseDir: ["dist"] },
    // }),
  ],
};
