const merge = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.config");

module.exports = merge(common, {
  entry: path.resolve(__dirname, "src/app.js"),
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3100,
  },
});
