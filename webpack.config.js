const fs = require('fs');
const path = require('path');

const PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin');

const projectPath = path.resolve(fs.realpathSync(process.cwd()), '.');
const packagesPath = path.resolve(fs.realpathSync(process.cwd()), 'packages');

const config = {
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      // Transform ES6 with Babel
      {
        test: /\.(js|jsx|mjs)$/,
        include: [projectPath],
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: true,
              cacheDirectory: true,
              presets: [],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  plugins: [],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.mjs', '.jsx', '.js', '.json'],
  },
};

if (process.env.NODE_ENV === 'production' && !process.env.DISABLE_PEER_DEPS_PLUGIN) {
  config.plugins.push(new PeerDepsExternalsPlugin());
}

module.exports = config;
