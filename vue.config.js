module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vuetify-toolkit/'
    : '/',
  configureWebpack: {
    ...(process.env.NODE_ENV === 'production'
      ? {
        externals: {
          'vuetify/lib': 'vuetify/lib'
        }
      }
      : {})
  }
}
