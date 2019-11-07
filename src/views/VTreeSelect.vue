<template>
  <div>
    <h1>VTreeSelect</h1>
    <span></span>
    <p>
      VTreeSelect is the component that provide tree-like data selection. This combines original Vuetify components VAutocomplete and VTreeview in one.
      You can use any nested data as item source.
    </p>
    <p>
      This component extends <a href = "https://vuetifyjs.com/ru/components/autocompletes">VAutocomplete</a> component.
      It contains all properties, slots, events of extended component.
      The part of VTreeSelect component is <a href = "https://vuetifyjs.com/ru/components/treeview">VTreeview</a>. Properties and events are repeated.
      Scoped slots of <a href = "https://vuetifyjs.com/ru/components/treeview">VTreeview</a> are transformed:
        <ul>
          <li>prepend = prependTree</li>
          <li>apend = apendTree</li>
          <li>label = labelTree</li>
        </ul>
    </p>
    <p>Added properties are below</p>
    <table class="v-card__text v-data-table elevation-1 theme--light">
        <thead>
           <tr>
            <th>Name</th> <th>Type</th> <th>Default</th><th>Describtion</th>
           </tr>
        </thead>
        <tbody>
           <tr>
            <td>autocomplete</td> <td>boolean</td> <td>true</td>
            <td>Switch between autocomplete/select behavior</td>
           </tr>
        </tbody>
    </table>
    <span />
    <h2>Sandbox</h2>
    <v-card :dark="dark">
      <v-card-text>
        <v-row justify="space-around">
          <v-switch v-model="autocomplete" class="ma-2" label="autocomplete"></v-switch>
          <v-switch v-model="multiple" class="ma-2" label="multiple"></v-switch>
          <v-switch v-model="chips" class="ma-2" label="chips"></v-switch>
          <v-switch v-model="dense" class="ma-2" label="dense"></v-switch>
          <v-switch v-model="clearable" class="ma-2" label="clearable"></v-switch>
          <v-switch v-model="dark" class="ma-2" label="dark"></v-switch>
          <v-switch v-model="customSlots" class="ma-2" label="Custom slots"></v-switch>
        </v-row>
        <v-tree-select
          :autocomplete="autocomplete"
          :chips="chips"
          :dense="dense"
          :multiple="multiple"
          :items="items"
          :clearable="clearable"
          :dark="dark"
        >
          <template v-if="customSlots" v-slot:prependTree="{ item, open }">
            <v-icon v-if = "item.children">{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
            <v-icon v-else>mdi-file</v-icon>
          </template>
        </v-tree-select>
      </v-card-text>
    </v-card>
    <span />
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
    VTreeSelect
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
    autocomplete: false,
    customSlots: false,
    //
    componentProps: [
      {
        name: 'autocomplete',
        type: 'boolean',
        default: 'true',
        describtion: ' enable or disable text typing for autocomplete behavior'
      },
      {
        name: 'dense',
        type: 'boolean',
        default: 'true',
        describtion: ' enable or disable text typing for autocomplete behavior'
      }
    ],
    //
    componentSlots: [
      { name: 'default', describtion: ' default component slot ' }
    ],
    //
    componentEvents: [
      { name: 'default', describtion: ' default component slot ', value: '' }
    ]
  })
})
</script>
