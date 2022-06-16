import { merge } from "webpack-merge";
import base from "./base.js";
import TerserPlugin from "terser-webpack-plugin";

export default merge(base, {
  mode: "production",
  output: {
    filename: "bundle.min.js",
    clean: true,
  },
  devtool: false,
  performance: {
    maxEntrypointSize: 900000,
    maxAssetSize: 900000,
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
