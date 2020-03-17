import Vue from 'vue'
export default function mixins (...args: any[]) {
  return Vue.extend({
    mixins: args
  })
}
