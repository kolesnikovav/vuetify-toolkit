module.exports = {
  'transpileDependencies': [
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
          'vuetify/lib/components/VAutocomplete/VAutocomplete': 'vuetify/lib/components/VAutocomplete/VAutocomplete',
          'vuetify/lib/components/VBtn/VBtn': 'vuetify/lib/components/VBtn/VBtn',
          'vuetify/lib/components/VDivider/VDivider': 'vuetify/lib/components/VDivider/VDivider',
          'vuetify/lib/components/VIcon/VIcon': 'vuetify/lib/components/VIcon/VIcon',
          'vuetify/lib/components/VGrid': 'vuetify/lib/components/VGrid',
          'vuetify/lib/components/VSelect/VSelect': 'vuetify/lib/components/VSelect/VSelect',
          'vuetify/lib/components/VList': 'vuetify/lib/components/VList',
          'vuetify/lib/components/VDataTable/VDataTable': 'vuetify/lib/components/VDataTable/VDataTable',
          'vuetify/lib/components/VDataIterator/VDataIterator': 'vuetify/lib/components/VDataIterator/VDataIterator',
          'vuetify/lib/components/VDatePicker/VDatePicker': 'vuetify/lib/components/VDatePicker/VDatePicker',
          'vuetify/lib/components/VTimePicker/VTimePicker': 'vuetify/lib/components/VTimePicker/VTimePicker',
          'vuetify/lib/components/VCard/VCard': 'vuetify/lib/components/VCard/VCard',
          'vuetify/lib/components/VTextField/VTextField': 'vuetify/lib/components/VTextField/VTextField',
          'vuetify/lib/components/VTreeview/VTreeview': 'vuetify/lib/components/VTreeview/VTreeview',
          'vuetify/lib/components/VTreeview/VTreeviewNode': 'vuetify/lib/components/VTreeview/VTreeviewNode',
          'vuetify/lib/components/VToolbar/VToolbar': 'vuetify/lib/components/VToolbar/VToolbar',
          'vuetify/lib/components/VTooltip/VTooltip': 'vuetify/lib/components/VTooltip/VTooltip',
          'vuetify/lib/components/VSlideGroup': 'vuetify/lib/components/VSlideGroup',
          'vuetify/lib/components/VPagination/VPagination': 'vuetify/lib/components/VPagination/VPagination',
          /* utils & helpers */
          'vuetify/lib/util/console': 'vuetify/lib/util/console',
          'vuetify/lib/util/helpers': 'vuetify/lib/util/helpers',
          'vuetify/lib/util/mixins': 'vuetify/lib/util/mixins',

          /* mixins */
          'vuetify/lib/mixins/colorable': 'vuetify/lib/mixins/colorable',
          // import { DataIterable } from 'vuetify/lib/mixins/data-iterable'
          'vuetify/lib/mixins/themeable': 'vuetify/lib/mixins/themeable'
        }
      }
      : {})
  }
}
