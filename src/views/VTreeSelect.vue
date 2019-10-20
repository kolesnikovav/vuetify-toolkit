<template>
  <div>
      <h1>VTreeSelect</h1>
      <span></span>
      <p>VTreeSelect is the component that provide tree-like data selection. This combines original Vuetify components VAutocomplete and VTreeview in one.
        You can use any nested data like item source.
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
          <v-switch v-model="multiple" class="ma-2" label="multiple"></v-switch>
          <v-switch v-model="chips" class="ma-2"    label="chips"></v-switch>
          <v-switch v-model="dense" class="ma-2"    label="dense"></v-switch>
          <v-switch v-model="clearable" class="ma-2"    label="clearable"></v-switch>
          <v-switch v-model="dark" class="ma-2"    label="dark"></v-switch>
          </v-row>
          <v-tree-select :chips = "chips" :dense = "dense" :multiple = "multiple" :items="items" :clearable = "clearable" :dark = "dark"></v-tree-select>
        </v-card-text>
      </v-card>
      <span/>
      <h2>Examples</h2>
      <h3>v-tree-select-select example (chips selections)</h3>
      <v-tree-select chips :items="items" clearable></v-tree-select>
      <h3>v-tree-select-select example (no data)</h3>
      <v-tree-select chips clearable></v-tree-select>
      <h3>v-tree-select-select example (multiple selection)</h3>
      <v-tree-select chips :items="items" clearable multiple></v-tree-select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VTreeSelect from '../components/VTreeSelect'
import VApi from './API.vue'
import { staticitems, dataGridHeaders, desserts } from '../example-data'

export default Vue.extend({
  components: {
    VTreeSelect,
    VApi
  },
  data: () => ({
    items: staticitems,
    dataGridHeaders: dataGridHeaders,
    desserts: desserts,
    chips: false,
    multiple: false,
    dense: false,
    clearable: false,
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
