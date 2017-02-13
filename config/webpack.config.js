// Example webpack configuration with asset fingerprinting in production.
'use strict';

var path = require('path');
var webpack = require('webpack');
var StatsPlugin = require('stats-webpack-plugin');

// must match config.webpack.dev_server.port
var devServerPort = 3808;

// set NODE_ENV=production on the environment to add asset fingerprints
var production = process.env.NODE_ENV === 'production';

var config = {
    entry: [
        'babel-polyfill',
        path.join(__dirname, '..', 'webpack', 'src') + '/index.jsx'
    ],

    output: {
        // Build assets directly in to public/webpack/, let webpack know
        // that all webpacked assets start with webpack/

        // must match config.webpack.output_dir
        path: path.join(__dirname, '..', 'public', 'assets'),
        publicPath: '/assets/',

        filename: production ? '[name]-[chunkhash].js' : 'bundle.js'
    },

    module: {
        loaders: [{
            loader: 'babel',
            test: /.jsx?$/,
            include: [
                path.join(__dirname, '..', 'webpack', 'src'),
            ],
        }],
    },

    resolve: {
        root: path.join(__dirname, '..', 'webpack'),
        moduleDirectories: ['/node_modules'],
        extensions: ['', '.js', '.jsx']
    },

    resolveLoader: {
        moduleDirectories: ['/node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js', '.jsx']
    },

    plugins: [
        // must match config.webpack.manifest_filename
        new StatsPlugin('manifest.json', {
          // We only need assetsByChunkName
          chunkModules: false,
          source: false,
          chunks: false,
          modules: false,
          assets: true
        })]
};

if (production) {
  config.plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  );
} else {
  config.devServer = {
    port: devServerPort,
    headers: { 'Access-Control-Allow-Origin': '*' }
  };
  config.output.publicPath = '//localhost:' + devServerPort + '/webpack/';
  // Source maps
  config.devtool = 'cheap-module-eval-source-map';
}

module.exports = config;
