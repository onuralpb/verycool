const merge = require("webpack-merge");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const common = require("./webpack.common.config");

module.exports = merge(common, {
  entry: path.resolve(__dirname, "src/app.firebase.js"),
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist_firebase"),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist_firebase"),
    port: 3200,
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
});
