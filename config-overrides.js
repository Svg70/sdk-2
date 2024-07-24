const { override, addWebpackModuleRule, addWebpackResolve } = require('customize-cra');

module.exports = override(
  addWebpackResolve({
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
  }),
  addWebpackModuleRule({
    test: /\.mjs$/,
    include: /node_modules/,
    type: 'javascript/auto',
  }),
  addWebpackModuleRule({
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
      },
    },
  })
);
