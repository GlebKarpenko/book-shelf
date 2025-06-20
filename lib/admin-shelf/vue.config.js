const { defineConfig } = require('@vue/cli-service')
const path = require('path');

module.exports = defineConfig({
  publicPath: '/admin/',
  devServer: {
    port: 8085,
  },
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@book-shelf/component-lib': path.resolve(__dirname, '../../component-lib/src')
      }
    }
  }
})