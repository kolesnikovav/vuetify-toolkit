<template>
  <div>
    <h1>VCascader</h1>
    <span></span>
    <p>
      VCascader is the cascade selection box. Use this when you need multi-stage selection.
      It made for reducing items and simplifying user choice.
    </p>
    <p>
      This component extends
      <a href="https://vuetifyjs.com/en/components/autocompletes">VAutocomplete</a> component.
      It contains all properties, slots, events of extended component. Because items can be nested, component includes some properties,
      similiar as VTreeSelect component.
    </p>
    <p>Added properties are below</p>
    <table class="v-card__text v-data-table elevation-1 theme--light">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
          <th>Describtion</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>autocomplete</td>
          <td>boolean</td>
          <td>true</td>
          <td>Switch between autocomplete/select behavior</td>
        </tr>
        <tr>
          <td>item-children</td>
          <td>[String, Function]</td>
          <td>'children'</td>
          <td>Is the name or function of children items property</td>
        </tr>
      </tbody>
    </table>
    <span />
    <h2>Sandbox</h2>
    <v-card :dark="dark">
      <v-toolbar dense flat grey lighten-3>
        <v-spacer></v-spacer>
        <v-btn icon @click="codeSandbox = !codeSandbox">
          <v-icon>mdi-codepen</v-icon>
        </v-btn>
      </v-toolbar>
      <v-tabs v-if="codeSandbox" :dark="dark" right>
        <v-tab>Template</v-tab>
        <v-tab>Script</v-tab>
        <v-tab>Data source</v-tab>
        <v-tab-item>
          <div class="v-markup v-card v-card--outlined v-sheet theme--light grey darken-4">
            <pre class="language-html">
           <code class="language-html code-text">{{sandboxTemplate}}</code>
          </pre>
          </div>
        </v-tab-item>
        <v-tab-item>
          <div class="v-markup v-card v-card--outlined v-sheet theme--light grey darken-4">
            <pre class="language-javascript">
           <code class="language-javascript code-text">{{sandboxCode}}</code>
          </pre>
          </div>
        </v-tab-item>
        <v-tab-item>
          <div class="v-markup v-card v-card--outlined v-sheet theme--light grey darken-4">
            <pre class="language-json">
           <code class="language-json code-text">{{dataSource}}</code>
          </pre>
          </div>
        </v-tab-item>
      </v-tabs>
      <v-card-text>
        <v-row justify="space-around">
          <v-switch v-model="autocomplete" class="ma-2" label="autocomplete"></v-switch>
          <v-switch v-model="multiple" class="ma-2" label="multiple"></v-switch>
          <v-switch v-model="chips" class="ma-2" label="chips"></v-switch>
          <v-switch v-model="dense" class="ma-2" label="dense"></v-switch>
          <v-switch v-model="clearable" class="ma-2" label="clearable"></v-switch>
          <v-switch v-model="dark" class="ma-2" label="dark"></v-switch>
        </v-row>
        <v-cascader
          :autocomplete="autocomplete"
          :itemText="name"
          :chips="chips"
          :dense="dense"
          :multiple="multiple"
          :items="items"
          :clearable="clearable"
          :dark="dark"
        ></v-cascader>
      </v-card-text>
    </v-card>
    <span />
    <h2>Examples</h2>
    <h3>v-cascader example (chips selections)</h3>
    <v-cascader :items="items" :itemText="name" clearable></v-cascader>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ofices } from '../example-data'

const sandboxTemplateHTML = '<v-cascader\n' +
          '  :autocomplete="autocomplete"\n' +
          '  :chips="chips"\n' +
          '  :dense="dense"\n' +
          '  :itemText="name"\n' +
          '  :multiple="multiple"\n' +
          '  :items="items"\n' +
          '  :clearable="clearable"\n' +
          '  :dark="dark"\n' +
          '>\n' +
          '</v-cascader>'

const sandboxCode = '\n' +
'export default ({\n' +
'  data: () => ({\n' +
'    items: ofices, // see data source \n' +
'    chips: false,\n' +
'    multiple: false,\n' +
'    dense: false,\n' +
'    clearable: false,\n' +
'    dark: false,\n' +
'    autocomplete: false,\n' +
'  })\n' +
'})\n'

export default Vue.extend({
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
    codeSandbox: false,
    sandboxTemplate: sandboxTemplateHTML,
    sandboxCode: sandboxCode,
    dataSource: ofices
  })
})
</script>
