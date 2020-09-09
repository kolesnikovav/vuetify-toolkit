import Vue from 'vue'
import { install } from './install'

export default class VuetifyToolkit {
  static install = install

  static installed = false

  public installed: string[] = []

  // Called on the new vuetify-toolkit instance
  // bootstrap in install beforeCreate
  // Exposes ssrContext if available
  init (root: Vue, ssrContext?: object) {}
}
