const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  css : {
    loaderOptions : {
      scss : {
        additionalData: `
          @import "src/sass/variables.scss";
          @import "src/sass/common.scss";
        `
      }
    }
  }
})
/*
module.exports = {
  css : {
    loaderOptions : {
      scss : {
        additionalData: `
          @import "@/src/sass/variables.scss";
          @import "@/src/sass/common.scss";
        `
      }
    }
  }
}
*/
/*
const target = 'http://localhost:3000/';
//const target = 'http://ec2-3-36-6-64.ap-northeast-2.compute.amazonaws.com:3000/';

module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      '^/api': {
        target,
        changeOrigin: true
      },
      '^/upload': {
        target,
        changeOrigin: true,
      },
      '^/download': {
        target,
        changeOrigin: true,
      }
    }
    
  }
}
*/