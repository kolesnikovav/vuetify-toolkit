<template>
<v-tooltip :top = "computedTop" :bottom = "computedBottom">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          :icon = false
          text
        >
        <div v-if = "hasIcon">
          <v-icon
          :color="iconColor"
          >{{btnIcon}}</v-icon>
        </div>
          {{btnText}}
        </v-btn>
      </template>
      <span>{{hint}}</span>
</v-tooltip>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'v-tooltip-btn',
  props: {
    hint: String,
    btnText: String,
    btnIcon: String,
    iconColor: String,
    tooltipPosition: {
      type: String,
      default: 'top',
      validator: (v: string) => ['top', 'bottom'].includes(v)
    }
  },
  computed: {
    computedTop (): boolean {
      return !!((!this.tooltipPosition || this.tooltipPosition === 'top'))
    },
    computedBottom (): boolean {
      return !this.computedTop
    },
    hasIcon (): boolean {
      return !!this.btnIcon
    },
    hasText (): boolean {
      return !!this.btnText && this.hasIcon
    }
  }
})

</script>
