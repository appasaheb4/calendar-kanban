const path = require('path');

module.exports = {
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      'react-native-linear-gradient': 'react-native-web-linear-gradient',
    },
    extensions: ['.web.js', '.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
