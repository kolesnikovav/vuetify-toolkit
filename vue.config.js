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
          'vuetify/lib': 'vuetify/lib',
          'vuetify/lib/components/VTreeview/VTreeviewNode': 'vuetify/lib/components/VTreeview/VTreeviewNode',
          /* utils & helpers */
          'vuetify/lib/util/console': 'vuetify/lib/util/console',
          'vuetify/lib/util/helpers': 'vuetify/lib/util/helpers',
          'vuetify/lib/util/mixins': 'vuetify/lib/util/mixins',

          /* mixins */
          'vuetify/lib/mixins/colorable': 'vuetify/lib/mixins/colorable',
          'vuetify/lib/mixins/themeable': 'vuetify/lib/mixins/themeable'
        }
      }
      : {})
  }
}
