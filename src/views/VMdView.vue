<template>
  <div>
      <h1>VMdView</h1>
      <span></span>
      <p>VMdView is the component that uses for master-detail view.
        It can be used separately or as a part of your custom pickers.
      </p>
      <h2>API</h2>
      <v-card>
        <v-api :PROPS="componentProps" :SLOTS="componentSlots" :EVENTS="componentEvents">
        </v-api>
      </v-card>
      <span/>
      <h2>Sandbox</h2>
      <v-card :dark="dark">
        <v-card-text>
          <v-row justify="space-around">
          <v-switch v-model="selectable" class="ma-2"    label="selectable"></v-switch>
          <v-switch v-model="multiple" class="ma-2" label="multiple"></v-switch>
          <v-switch v-model="dense" class="ma-2"    label="dense"></v-switch>
          <v-switch v-model="dark" class="ma-2"    label="dark"></v-switch>
          </v-row>
          <v-md-view :items = "items" :dark = "dark" :headers = "mdvHeaders" :selectable = "selectable" :multiple = "multiple" :dense = "dense"></v-md-view>
        </v-card-text>
      </v-card>
      <span/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VMdView from '../components/VMdView'
import VApi from './API.vue'
import { staticitems, dataGridHeaders, desserts, mdvHeaders } from '../example-data'

export default Vue.extend({
  components: {
    VMdView,
    VApi
  },
  data: () => ({
    items: staticitems,
    mdvHeaders: mdvHeaders,
    desserts: desserts,
    selectable: true,
    multiple: false,
    dense: false,
    dark: false,
    //
    componentProps: [
      { name: 'autocomplete',
        type: 'boolean',
        default: 'true',
        describtion: ' enable or disable text typing for autocomplete behavior'
      },
      { name: 'dense',
        type: 'boolean',
        default: 'true',
        describtion: ' enable or disable text typing for autocomplete behavior'
      }
    ],
    //
    componentSlots: [
      { name: 'default',
        describtion: ' default component slot '
      }
    ],
    //
    componentEvents: [
      { name: 'default',
        describtion: ' default component slot ',
        value: ''
      }
    ]
  })
})
</script>
