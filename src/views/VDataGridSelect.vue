<template>
  <div>
      <h1>VDataGridSelect</h1>
      <span></span>
      <p>VDataGridSelect is the component that uses for selection from tabular data.
        You can use this component when requires additional info before selection.
      </p>
      <h2>API</h2>
      <v-card>
        <v-api :PROPS="componentProps" :SLOTS="componentSlots" :EVENTS="componentEvents">
        </v-api>
      </v-card>
      <span/>
      <h2>Sandbox</h2>
      <span/>
      <v-card :dark="dark">
        <v-card-text>
          <v-row justify="space-around">
          <v-switch v-model="multiple" class="ma-2" label="multiple"></v-switch>
          <v-switch v-model="chips" class="ma-2"    label="chips"></v-switch>
          <v-switch v-model="dense" class="ma-2"    label="dense"></v-switch>
          <v-switch v-model="clearable" class="ma-2"    label="clearable"></v-switch>
          <v-switch v-model="dark" class="ma-2"    label="dark"></v-switch>
          </v-row>
          <v-data-grid-select :chips = "chips" :dense = "dense" :multiple = "multiple" :items="items" :clearable = "clearable"
            :headers="dataGridHeaders" item-key = "name" item-text = "name" :dark = "dark"
          ></v-data-grid-select>
        </v-card-text>
      </v-card>
      <h2>Examples</h2>
    <h3>v-data-grid-select example</h3>
    <v-data-grid-select chips :items="items" :headers="dataGridHeaders" item-key = "name" item-text = "name" clearable>
    </v-data-grid-select>
    <h3>v-data-grid-select example (multiple select dense)</h3>
    <v-data-grid-select chips :items="items" :headers="dataGridHeaders" item-key="name" item-text = "name" clearable multiple dense>
    </v-data-grid-select>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VDataGridSelect from '../components/VDataGridSelect'
import VApi from './API.vue'
import { dataGridHeaders, desserts } from '../example-data'

export default Vue.extend({
  components: {
    VDataGridSelect,
    VApi
  },
  data: () => ({
    items: desserts,
    dataGridHeaders: dataGridHeaders,
    desserts: desserts,
    //
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
