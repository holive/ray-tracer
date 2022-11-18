const path = require('path');

module.exports = {
  devServer: {
    port: 9000,
    static: { directory: path.join(__dirname, 'public') },
  },
  mode: 'development',
  entry: {
    main: './src/scenes/sphere/index.ts',
    worker: './src/scenes/sphere/worker.ts'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [
          /node_modules/,
          /\.worker\.ts$/i
        ],
      },
      {
        test:  /\.worker\.ts$/i,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      "fs": false
    },
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
  },
};
