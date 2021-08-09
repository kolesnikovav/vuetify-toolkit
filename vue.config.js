module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vuetify-toolkit/'
    : '/',
  outputDir: process.argv.includes('--EXTERNALIZE_VUETIFY') ? 'dist' : 'dist/lib',
  configureWebpack: {
    ...(process.env.NODE_ENV === 'production' && process.argv.includes('--EXTERNALIZE_VUETIFY')
      ? {
        externals: {
          'vuetify/lib': 'vuetify/lib'
        }
      }
      : {})
  }
}
