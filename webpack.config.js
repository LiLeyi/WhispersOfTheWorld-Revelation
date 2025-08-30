const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: {
      index: './src/index.ts',
      main_menu: './src/pages/main_menu/main_menu.ts',
      archive_page: './src/pages/archive_page/archive_page.ts',
      game_scene: './src/pages/game_scenes/game_scenes.ts',
      login: './src/pages/login_page/login.ts',
      register: './src/pages/login_page/register.ts'
    },
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      static: './dist',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name][ext]'
          }
        },
        {
          test: /\.(mp3|wav|ogg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/bgm/[name][ext]'
          }
        },
        {
          test: /\.(ttf|woff|woff2|eot)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name][ext]'
          }
        }
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: '[name]/[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: isProduction ? 'auto' : '/',  // 生产环境使用自动路径，开发环境使用根路径
      assetModuleFilename: 'assets/images/[name][ext]'
    },
    optimization: {
      minimize: isProduction,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['index'],
      }),
      new HtmlWebpackPlugin({
        template: './src/pages/main_menu/main_menu.html',
        filename: 'pages/main_menu/main_menu.html',
        chunks: ['main_menu'],
      }),
      new HtmlWebpackPlugin({
        template: './src/pages/archive_page/archive_page.html',
        filename: 'pages/archive_page/archive_page.html',
        chunks: ['archive_page'],
      }),
      new HtmlWebpackPlugin({
        template: './src/pages/game_scenes/game_scenes.html',
        filename: 'pages/game_scenes/game_scenes.html',
        chunks: ['game_scene'],
      }),
      new HtmlWebpackPlugin({
        template: './src/pages/login_page/login.html',
        filename: 'pages/login_page/login.html',
        chunks: ['login'],
      }),
      new HtmlWebpackPlugin({
        template: './src/pages/login_page/register.html',
        filename: 'pages/login_page/register.html',
        chunks: ['register'],
      }),
      new CopyWebpackPlugin({
        patterns: [
          { 
            from: 'src/assets/images', 
            to: 'assets/images',
            // 确保目录结构被保持
            noErrorOnMissing: true
          },
          { from: 'src/assets/bgm', to: 'assets/bgm' },
          { from: 'src/assets/fonts', to: 'assets/fonts' }
        ]
      })
    ]
  };
};