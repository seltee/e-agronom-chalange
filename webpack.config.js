const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const PACKAGE = require('./package.json');

module.exports = (env) => {
  const PRODUCTION = !!(env.WEBPACK_BUILD || env.production);
  const FILE_NAME = 'argo-test';
  const ENTRY_POINT = path.resolve(__dirname, 'src/index.tsx');
  const DISTANATION = path.resolve(__dirname, PRODUCTION ? 'build/' : 'dist/');
  const VERSION = PACKAGE.version;
  const GAME_FILE_NAME = FILE_NAME + (PRODUCTION ? `_${VERSION}.min` : '');

  return {
    entry: {
      [GAME_FILE_NAME]: [ENTRY_POINT]
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },

    output: {
      path: DISTANATION,
      filename: '[name].js',
      clean: PRODUCTION ? true : false
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },

    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: '**/*',
            to: path.resolve(__dirname, PRODUCTION ? 'build/assets' : 'dist/assets'),
            context: 'assets/images'
          },
          {
            from: 'assets/index.html',
            to: path.resolve(__dirname, PRODUCTION ? 'build/index.html' : 'dist/index.html'),
            transform: (content) => content.toString().replace('{fileName}', GAME_FILE_NAME)
          }
        ]
      })
    ],

    target: 'web',

    devServer: {
      contentBase: path.join(__dirname, 'dist/'),
      compress: true,
      port: 9000
    },

    mode: PRODUCTION ? 'production' : 'development'
  };
};
