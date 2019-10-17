<template>
  <v-row align="center">
    <v-col>
      <v-card>
        <v-tabs vertical>
        <v-tab v-for="header in headers" :key="header">
          {{header}}
        </v-tab>
          <v-tab-item v-for="header in headers" :key="header">
              <v-api-props v-if = "header === 'PROPS'" :items = "getProps()"></v-api-props>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import VApiProps from './APIProps'

export default {
  name: 'v-api',
  components: {
    VApiProps
  },
  props: {
    PROPS: {
      type: Array,
      default: () => []
    },
    SLOTS: {
      type: Array,
      default: () => []
    },
    EVENTS: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    headers: [],
    length: 3,
    window: 0
  }),
  mounted () {
    this.headers = []
    if (this.PROPS && this.PROPS.length > 0) this.headers.push('PROPS')
    if (this.SLOTS && this.SLOTS.length > 0) this.headers.push('SLOTS')
    if (this.EVENTS && this.EVENTS.length > 0) this.headers.push('EVENTS')
  },
  methods: {
    getProps () {
      return this.PROPS
    }
  }
}
</script>
