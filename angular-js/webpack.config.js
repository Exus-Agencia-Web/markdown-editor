const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProd ? 'angular-markdown-editor.min.js' : 'angular-markdown-editor.js',
      // Lazy-loaded chunks (e.g. highlight.js / lowlight) get predictable names.
      chunkFilename: isProd
        ? '[name].chunk.min.js'
        : '[name].chunk.js',
      library: {
        name: 'AngularMarkdownEditor',
        type: 'umd',
      },
      globalObject: 'typeof self !== "undefined" ? self : this',
      clean: true,
    },
    externals: {
      angular: 'angular',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      fallback: {
        // Polyfills / stubs for Node.js built-ins used by dependencies.
        process: require.resolve('process/browser'),
        punycode: require.resolve('punycode/'),
        url: require.resolve('url/'),
        fs: false,
        path: false,
        'source-map': false,
      },
    },
    module: {
      rules: [
        {
          // Disable "fully specified" ESM enforcement for .mjs / ESM .js so
          // packages like @lezer/lr can resolve 'process/browser' without the
          // explicit '.js' extension.
          test: /\.m?js$/,
          resolve: { fullySpecified: false },
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: { loader: 'babel-loader' },
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { url: true } },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { url: true } },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: [path.resolve(__dirname, 'node_modules')],
                },
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          type: 'asset',
          parser: { dataUrlCondition: { maxSize: 50 * 1024 } },
          generator: { filename: 'fonts/[name][ext]' },
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          type: 'asset',
          parser: { dataUrlCondition: { maxSize: 8 * 1024 } },
          generator: { filename: 'images/[name][ext]' },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'angular-markdown-editor.css',
      }),
      // Inject the `process` global required by CommonJS / older ESM packages.
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ],
    optimization: {
      minimize: isProd,
      // Use human-readable chunk IDs for easier debugging and consistent
      // file names across builds.
      chunkIds: 'named',
    },
    // Suppress size warnings – the bundle is large by design (includes React +
    // full editor). Users should use gzip/brotli compression in production.
    performance: { hints: false },
  };
};
