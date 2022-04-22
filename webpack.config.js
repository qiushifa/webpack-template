const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        loader: "ts-loader",
        options: {
          configFile: path.resolve("./tsconfig.json"),
        },
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          // 创建style标签，将js中样式资源插入js中，header中生效
          // 单独提取css的时候，需要关闭
          // "style-loader",

          // 取代style-loader,提取js中的css成单独文件
          MiniCssExtractPlugin.loader,

          // 将css文件变为commonjs模块加载到js中，里面的内容是样式字符串
          "css-loader",

          // postcss 兼容性处理
          {
            loader: "postcss-loader",
          },

          // 将scss编译为css
          "sass-loader",
        ],
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)/,
        // 只使用一个loader,直接写loader，不用use
        // url-loader 依赖 file-loader,故需下载两个loader
        loader: "url-loader",
        options: {
          // 图片小于8kb，会被base64处理
          limit: 8 * 1024,
          name: "[hash:10].[ext]",
        },
      },
    ],
  },
  plugins: [
    // 自动引入打包后的资源(比如js、css)到模版文件中
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
    // 将css 文件单独提取，所以要关闭style-loader
    new MiniCssExtractPlugin({
      filename: "assets/[name].css",
    }),
  ],
  // 自动打开、刷新浏览器
  // 只会在内存中打包，没有输出
  devServer: {
    // 打开的构建后文件目录
    static: path.resolve(__dirname, "dist"),
    // 启动gzip压缩
    compress: true,
    host: "localhost",
    port: 4403,
    // 自动打开浏览器
    open: true,
  },
};
