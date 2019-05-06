<template>
  <div id="app">
    <v-app>
    <h3>v-data-grid-select example</h3>
    <v-data-grid-select
    v-model="selected"
    :headers="dataGridHeaders"
    :items="desserts"
    :pagination.sync="pagination"
    select-all
    item-key="name"
    >
    <template v-slot:items="props">
      <tr :active="props.selected" @click="props.selected = !props.selected">
        <td>
          <v-checkbox
            :input-value="props.selected"
            primary
            hide-details
          ></v-checkbox>
        </td>
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="text-xs-right">{{ props.item.iron }}</td>
      </tr>
    </template>
    </v-data-grid-select>
    <!-- <h3>v-data-iterator-select example</h3>
    <v-data-iterator-select></v-data-iterator-select> -->
    <!-- <h3>v-step-select-select example</h3>
    <v-step-select></v-step-select> -->
    <h3>v-tree-select-select example (comma selections)</h3>
    <v-tree-select :items = "items" clearable></v-tree-select>
    <h3>v-tree-select-select example (async loading)</h3>
    <v-tree-select :items = "items" clearable></v-tree-select>
    </v-app>
  </div>
</template>

<script>
import VDataGridSelect from './components/VDataGridSelect'
// import VDataIteratorSelect from './components/VDataIteratorSelect'
// import VStepSelect from './components/VStepSelect'
import VTreeSelect from './components/VTreeSelect'

import { staticitems, dataGridHeaders, desserts } from './example-data'

export default {
  name: 'app',
  components: {
    VDataGridSelect,
    // VDataIteratorSelect,
    // VStepSelect,
    VTreeSelect
  },
  data: () => ({
    items: staticitems,
    dataGridHeaders: dataGridHeaders,
    desserts: desserts

  })
}
</script>
