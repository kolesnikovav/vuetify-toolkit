<template>
  <div>
      <h1>VCascader</h1>
      <span></span>
      <p>VCascader is cascade selection box. Use this when you need multi-stage selection.
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
          <v-switch v-model="autocomplete" class="ma-2" label="autocomplete"></v-switch>
          <v-switch v-model="multiple" class="ma-2" label="multiple"></v-switch>
          <v-switch v-model="chips" class="ma-2"    label="chips"></v-switch>
          <v-switch v-model="dense" class="ma-2"    label="dense"></v-switch>
          <v-switch v-model="clearable" class="ma-2"    label="clearable"></v-switch>
          <v-switch v-model="dark" class="ma-2"    label="dark"></v-switch>
          </v-row>
          <v-cascader :autocomplete = "autocomplete" :itemText = "name" :chips = "chips" :dense = "dense" :multiple = "multiple" :items="items" :clearable = "clearable" :dark = "dark" ></v-cascader>
        </v-card-text>
      </v-card>
      <span/>
      <h2>Examples</h2>
      <h3>v-cascader example (chips selections)</h3>
      <v-cascader :items = "items" :itemText = "name" clearable></v-cascader>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VCascader from '../components/VCascader'
import VApi from './API.vue'
import { ofices } from '../example-data'

export default Vue.extend({
  components: {
    VCascader,
    VApi
  },
  data: () => ({
    items: ofices,
    name: 'name',
    chips: false,
    multiple: false,
    dense: false,
    clearable: false,
    dark: false,
    autocomplete: false,
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
