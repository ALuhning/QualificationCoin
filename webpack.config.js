const webpack = require('webpack')

module.exports = {
  context: __dirname + '/src',
  entry: ['regenerator-runtime/runtime', './index'],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      {
        //Transform our own .css files with PostCSS and CSS-modules
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Do not transform vendor's CSS with CSS -modules
        // The point is that they remain in the global scope.
        // Since we require these CSS files in our JS or CSS files,
        // they will be a part of the compilation either way.
        // So, no need for ExtractTextplugin here.
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  node: {
    fs: 'empty',
    child_process: 'empty',
    crypto: true,
    util: true,
    stream: true,
    path: 'empty',
  },
  externals: {
    shelljs: 'commonjs shelljs',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.NETWORK': JSON.stringify(process.env.NETWORK)
    })
  ],
  optimization: {
    minimizer: []
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
}
