import webpack from "webpack"
import { resolve } from "path"
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import SriPlugin from "webpack-subresource-integrity"

import UglifyJsPlugin from "uglifyjs-webpack-plugin"
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin"

import rules from "./rules"
import {
  APP_TITLE,
  MODE,
  IS_DEVELOPMENT,
  IS_PRODUCTION,
  ENABLE_SOURCE_MAPS,
  APP_LOCALES
} from "./config"

export default {
  entry: "./src/client/index.js",
  mode: MODE,

  output: {
    path: resolve(__dirname, "dist"),
    filename: IS_DEVELOPMENT ? "index.js" : "index.[hash].js",
    chunkFilename: "chunk-[name].[chunkhash].js",
    crossOriginLoading: "anonymous"
  },

  module: {
    rules
  },

  optimization: {
    // Docs: https://webpack.js.org/plugins/split-chunks-plugin/
    splitChunks: {
      chunks: "all",

      // Since the chunk name includes all origin chunk names it’s recommended for production builds
      // with long term caching to NOT include [name] in the filenames, or switch off name generation
      // Via: https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      name: false
    },
    minimizer: IS_PRODUCTION ? [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: ENABLE_SOURCE_MAPS
      }),
      new OptimizeCSSAssetsPlugin({

      })
    ] : []
  },

  plugins: [
    new webpack.DefinePlugin({
      // Important:
      // We keep all these env-variables separate as this allows for
      // parallel usage of libraries like `dotenv` do make non compile-time
      // environment variables accessible.
      "process.env.NODE_ENV": JSON.stringify(MODE),

      // Set for edge environment to figure out that we are bundling for web usage.
      "process.env.BUILD_TARGET": JSON.stringify("web"),

      // Passes available locales to the client
      "process.env.SUPPORTED_LOCALES": JSON.stringify(APP_LOCALES)
    }),

    new webpack.ProgressPlugin(),

    IS_PRODUCTION ? new MiniCssExtractPlugin({
      filename: "[name]-[contenthash].css",
      chunkFilename: "chunk-[name]-[contenthash].css"
    }) : null,

    IS_DEVELOPMENT ? null : new SriPlugin({
      hashFuncNames: [ "sha256", "sha512" ],
      enabled: IS_PRODUCTION
    }),

    new HtmlWebpackPlugin({
      title: APP_TITLE
    })
  ].filter(Boolean)
}
