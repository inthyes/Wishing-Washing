const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({

  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },

  devServer: {
    proxy: 'http://localhost:3000'
  }
})
