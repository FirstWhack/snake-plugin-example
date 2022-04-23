const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { ModuleFederationPlugin } = webpack.container;
const storeHomepage = require("@micro-snake/engine/package.json").homepage;
const deps = require("./package.json").dependencies;

module.exports = (_, argv) => ({
  entry: "./index.js",
  mode: argv.mode,
  devtool: "eval-cheap-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 1338,
  },
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        // exclude: /node_modules(?:\/@micro-snake)/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "fruit",
      filename: "remoteEntry.js",
      exposes: {
        "./Apple": "./src/components/apple/apple",
        "./Plum": "./src/components/plum/plumContainer",
      },
      remotes: {
        engine: `engine@${storeHomepage}/remoteEntry.js`,
      },
      shared: [
        {
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-konva": {
            singleton: true,
            requiredVersion: deps["react-konva"],
          },
          konva: {
            singleton: true,
            requiredVersion: deps.konva,
          },
          mobx: { singleton: true, requiredVersion: deps.mobx },
          "mobx-react": {
            singleton: true,
            requiredVersion: deps["mobx-react"],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
});
