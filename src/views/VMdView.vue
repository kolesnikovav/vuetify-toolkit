<template>
  <div>
    <h1>VMdView</h1>
    <span></span>
    <p>
      VMdView is the component that uses for master-detail view.
      It can be used separately or as a part of your custom pickers.
    </p>
    <h2>API</h2>
    <v-card>
      <v-api :PROPS="componentProps" :SLOTS="componentSlots" :EVENTS="componentEvents"></v-api>
    </v-card>
    <span />
    <h2>Sandbox</h2>
    <v-card :dark="dark">
      <v-card-text>
        <v-row justify="space-around">
          <v-switch v-model="selectable" class="ma-2" label="selectable"></v-switch>
          <v-switch v-model="multiple" class="ma-2" label="multiple"></v-switch>
          <v-switch v-model="dense" class="ma-2" label="dense"></v-switch>
          <v-switch v-model="dark" class="ma-2" label="dark"></v-switch>
          <v-switch v-model="customSlots" class="ma-2" label="Custom slots"></v-switch>
          <v-switch v-model="hierarchy" class="ma-2" label="hierarchy"></v-switch>
        </v-row>
        <v-md-view
          :items="items"
          :dark="dark"
          :headers="mdvHeaders"
          :selectable="selectable"
          :multiple="multiple"
          :dense="dense"
          :hierarchy = "hierarchy"
        >
          <template v-if="customSlots" v-slot:prependTree="{ item, open }">
            <v-icon >{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
          </template>
          <template v-if="customSlots" v-slot:itemTable.data-table-select="{ isSelected, select }">
            <v-simple-checkbox color="green" :value="isSelected" @input="select($event)"></v-simple-checkbox>
          </template>
        </v-md-view>
      </v-card-text>
    </v-card>
    <span />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VMdView from '../components/VMdView'
import VApi from './API.vue'
import {
  staticitems,
  dataGridHeaders,
  desserts,
  mdvHeaders
} from '../example-data'

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
    customSlots: false,
    hierarchy: true,
    //
    componentProps: [
      {
        name: 'items',
        type: 'array',
        default: '[]',
        describtion: ' The array of items to display'
      },
      {
        name: 'item-key',
        type: 'string',
        default: 'id',
        describtion:
          'The field on each item object that designates a unique key. The value of this property has to be unique for each item.'
      },
      {
        name: 'item-text',
        type: 'string',
        default: 'name',
        describtion: 'The field of item object that uses for displaying item'
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
