const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = env => ({
  entry: {
    index: './src/index.tsx',
    aa: './src/plugin/aa/index.tsx',
    bb: './src/plugin/bb/index.tsx',
  },
  output: {
    filename: 'assets/[name]-[contenthash:8].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: { url: false },
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              sourceType: 'unambiguous', // [重要]如果存在导入/导出语句，则将文件视为“模块”，否则将其视为“脚本”。
              compact: false, // 这个建议配，能提升性能。这里只处理非压缩文件，所以设置为false。
            },
          },
          'ts-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          // 创建style标签，将js中样式资源插入js中，header中生效
          // 单独提取css的时候，需要关闭
          // "style-loader",

          /**
           * 这是一个 css 热加载器，它支持对提取的 css 文件进行热模块替换。
           * 大多数情况下，我们可以通过 style-loader 实现 css 热重载。
           * 但是 style-loader 需要将 style 标签注入到文档中，在 js 准备好之前网页将没有任何样式。那不是很好的经验
           */
          'css-hot-loader',
          // 取代style-loader,提取js中的css成单独文件
          MiniCssExtractPlugin.loader,

          // 将css文件变为commonjs模块加载到js中，里面的内容是样式字符串
          'css-loader',

          // postcss 兼容性处理
          {
            loader: 'postcss-loader',
          },

          // 将scss编译为css
          'sass-loader',
        ],
      },
      {
        // 处理图片资源
        test: /\.(jpg|png|gif)/,
        // 只使用一个loader,直接写loader，不用use
        // url-loader 依赖 file-loader,故需下载两个loader
        loader: 'url-loader',
        options: {
          // 图片小于8kb，会被base64处理
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
        },
      },
    ],
  },
  plugins: [
    // 自动引入打包后的资源(比如js、css)到模版文件中
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      // 压缩html
      // minify:{
      //   // 移除空格
      //   collapseWhitespace: true,
      //   // 移除注释
      //   removeComments: true
      // }
    }),
    new CleanWebpackPlugin(),
    // 将css 文件单独提取，所以要关闭style-loader
    new MiniCssExtractPlugin({
      filename: 'assets/[contenthash:10].css',
    }),
    // copy作用
    new CopyPlugin({
      patterns: [{ from: 'src/public', to: 'public' }],
    }),
  ],
  // 自动打开、刷新浏览器
  // 只会在内存中打包，没有输出
  devServer:
    env.NODE_ENV === 'local'
      ? {
          static: {
            // 的构建后文件目录
            directory: path.resolve(__dirname, 'dist'),
            // 监视static下所有文件 一旦有变化重新reload
            watch: true,
          },
          // 启动gzip压缩
          compress: true,
          host: 'localhost',
          port: 4403,
          // 自动打开浏览器
          open: true,
          // HMR,进行热模块替换
          hot: true,
        }
      : undefined,
  // 源代码到构建后代码的映射
  // 内联和外联区别： 1，内部生成文件，外联是外部生成；2，內联速度更快

  // source-map: 外联： 可以提示到 错误代码准确信息 和 源代码错误位置
  // inline-source-map: 内联,只生成一个内联source-map； 可以提示到 错误代码准确信息 和 源代码错误位置
  // eval-source-map: 内联，每个文件生成对应的source-map；可以提示到 错误代码准确信息 和 源代码错误位置
  // hidden-source-map: 外联；可以提示到构建后代码错误信息，但是没有错误位置
  // nosource-source-map: 外联；错误代码准确信息 但没有任何源代码错误位置

  // cheap-source-map: 外联；可以提示到源代码 错误代码准确信息 和 源代码错误位置（但是只能提示到行）
  // cheap-module-source-map: 外联；可以提示到 错误代码准确信息 和 源代码错误位置

  // 开发：eval-source-map
  // 生产：source-map / cheap-source-map
  devtool: env.NODE_ENV === 'local' ? 'eval-source-map' : undefined,
  // 更精确地控制 bundle 信息该怎么显示
  stats: 'minimal', // 只在发生错误或新的编译开始时输出
  /**
   * 1，可以将node-modules代码单独打包一个chunk输出
   * 2，自动分析多入口，将公共文件打包为一个单独chunk
   */
  // 也是可以精细化分包的地方
  optimization: {
    runtimeChunk: 'single', // 为所有块创建单个运行时包
    usedExports: true, // 开启优化（树摇但保留代码）
    minimize: env.NODE_ENV !== 'local', // 生产环境开启压缩 (删除未使用代码)
    splitChunks: {
      cacheGroups: {
        utils: {
          chunks: 'all',
          name: 'util',
          test: /[\\/]src[\\/]utils[\\/]/,
          enforce: true,
        },
        qrCode:{
          chunks: 'all',
          name: 'qrcode',
          test: /node_modules[\\/]react-qr-code/,
          enforce: true,
        },
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'sfd',
          priority: -10,
          reuseExistingChunk: true,
        },
        default:{

        }
      },
    },
    // 生产环境优化
    minimizer:
      env.NODE_ENV === 'local'
        ? undefined
        : [
            // 压缩 JavaScript。
            new TerserPlugin({
              extractComments: false,
            }),
            // 优化和压缩 CSS
            new CssMinimizerPlugin(),
          ],
  },
});
