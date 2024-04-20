const path = require('path');

module.exports = {
  mode: 'none',
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.js'], // Добавляем .ts в расширения, которые webpack будет искать
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Применяем правило только к файлам .ts
        use: 'ts-loader', // Используем ts-loader для компиляции TypeScript
        exclude: /node_modules/, // Исключаем папку node_modules из компиляции
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 8080, // Устанавливаем порт на 8080
  },
};
