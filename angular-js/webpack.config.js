const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  // ── Scoped-CSS pipeline ──
  // Prefix every selector emitted by the editor's CSS (gravity-ui, prosemirror,
  // markdown-it, etc.) with `.g-root`. The React tree wraps the editor in a
  // ThemeProvider that always carries `g-root`, so editor styling still works,
  // but global resets like `body { font-size: 13px }` no longer leak to the
  // surrounding CRM page.
  const ROOT_RE = /^(:root|html|body)\b/;
  const SKIP_AT_RULES = new Set(['keyframes', 'font-face', 'media', 'supports']);
  const postcssPrefixOptions = {
    prefix: '.g-root',
    transform(prefix, selector, prefixedSelector, filePath, rule) {
      // Skip declarations inside @keyframes / @font-face — they are not real
      // selectors and prefixing them produces invalid CSS.
      let parent = rule && rule.parent;
      while (parent) {
        if (parent.type === 'atrule' && SKIP_AT_RULES.has(parent.name)) {
          return selector;
        }
        parent = parent.parent;
      }
      // Skip every selector that already targets gravity-ui's own classes —
      // they live exclusively inside the React tree (which carries `.g-root`)
      // and inside body-level portals (`.g-root_theme_*`). Prefixing them
      // would break compound selectors like `.g-root.g-root_theme_light`.
      if (selector.startsWith('.g-')) return selector;
      // Universal selectors must remain descendants.
      if (selector === '*' || selector === '*::before' || selector === '*::after') {
        return prefix + ' ' + selector;
      }
      // Global resets on :root/html/body collapse onto the .g-root container,
      // which acts as the editor's local root.
      if (ROOT_RE.test(selector)) {
        return selector.replace(ROOT_RE, prefix);
      }
      return prefixedSelector;
    },
  };
  const postcssLoaderUse = {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          ['postcss-prefix-selector', postcssPrefixOptions],
        ],
      },
    },
  };

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: 'auto',
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
            postcssLoaderUse,
          ],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { url: true } },
            postcssLoaderUse,
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
        filename: isProd ? 'angular-markdown-editor.min.css' : 'angular-markdown-editor.css',
      }),
      // Inject the `process` global required by CommonJS / older ESM packages.
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
    ],
    optimization: {
      minimize: isProd,
      minimizer: [
        '...', // keep default TerserPlugin for JS
        new CssMinimizerPlugin(),
      ],
      // Use human-readable chunk IDs for easier debugging and consistent
      // file names across builds.
      chunkIds: 'named',
    },
    // Suppress size warnings – the bundle is large by design (includes React +
    // full editor). Users should use gzip/brotli compression in production.
    performance: { hints: false },
  };
};
