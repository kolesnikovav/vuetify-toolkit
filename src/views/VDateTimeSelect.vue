<template>
  <div>
    <h1>VDateTimeSelect</h1>
    <span></span>
    <p>
      VDateTimeSelect is specialy designed for date/ time / datetime selection.
    </p>
    <p>
      This component consist of <a href = "https://vuetifyjs.com/en/components/date-pickers">VDatePicker</a> and <a href = "https://vuetifyjs.com/en/components/time-pickers">VTimePicker</a>. Properties are repeated when it not match.
      In match case, properties transform by adding 'Date' or 'Time' suffix in original components properties. For example, max property becomes maxDate or maxTime in suitably context
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
            <td>selectionType</td> <td>string</td> <td>datetime</td>
            <td>Can be 'datetime', 'date' or 'time'</td>
           </tr>
        </tbody>
    </table>
    <span />
    <h2>Sandbox</h2>
    <v-card :dark="dark">
      <v-toolbar dense flat grey lighten-3>
        <v-spacer></v-spacer>
        <v-btn icon @click = "codeSandbox = !codeSandbox">
          <v-icon >mdi-codepen</v-icon>
        </v-btn>
      </v-toolbar>
      <v-tabs
          v-if = "codeSandbox"
          :dark="dark"
          right
      >
      <v-tab>Template</v-tab>
      <v-tab>Script</v-tab>
      <v-tab-item>
        <div class = "v-markup v-card v-card--outlined v-sheet theme--light grey darken-4">
          <pre class = "language-html">
           <code class="language-html code-text" >{{sandboxTemplate}}</code>
          </pre>
        </div>
      </v-tab-item>
      <v-tab-item>
        <div class = "v-markup v-card v-card--outlined v-sheet theme--light grey darken-4">
          <pre class = "language-javascript">
           <code class="language-javascript code-text" >{{sandboxCode}}</code>
          </pre>
        </div>
      </v-tab-item>
    </v-tabs>
      <v-card-text>
        <v-row justify="space-around">
          <v-switch v-model= "dense" class="ma-2" label="dense"></v-switch>
          <v-switch v-model= "clearable" class="ma-2" label="clearable"></v-switch>
          <v-switch v-model = "dark" class="ma-2" label="dark"></v-switch>
        </v-row>
        <v-row justify="space-between">
          <v-select label = "select your locale" :items="locales" v-model = "currentLocale"></v-select>
          <v-select label = "selection type" :items = "selectionTypes" v-model = "selectionType"></v-select>
          <v-select label = "text align" :items = "textAlignVarians" v-model = "textAlign"></v-select>
        </v-row>
        <v-date-time-select
          :chips="chips"
          :dense="dense"
          :clearable="clearable"
          :dark="dark"
          :locale ="currentLocale"
          :selectionType ="selectionType"
          :text-align = "textAlign"
          use-toolbar
        >
        </v-date-time-select>
      </v-card-text>
    </v-card>
    <span />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
const sandboxTemplateHTML =
`<v-date-time-select
            :chips="chips"
            :dense="dense"
            :clearable="clearable"
            :dark="dark"
            :locale="currentLocale"
            :selectionType="selectionType"
          >
</v-date-time-select>`

const sandboxCode =
`export default ({
  data: () => ({
    chips: false,
    dense: false,
    clearable: false,
    dark: false,
    autocomplete: false,
    locale: 'en'
    selectionType: 'datetime',
  })
})`

export default Vue.extend({
  data: () => ({
    items: [],
    chips: false,
    multiple: false,
    dense: false,
    clearable: false,
    dark: false,
    autocomplete: false,
    customSlots: false,
    currentLocale: 'en',
    selectionType: 'datetime',
    textAlign: 'left',
    locales: ['en', 'ru', 'it', 'pt', 'pl', 'zh'],
    selectionTypes: ['date', 'time', 'datetime'],
    textAlignVarians: ['left', 'right', 'center'],
    codeSandbox: false,
    sandboxTemplate: sandboxTemplateHTML,
    sandboxCode: sandboxCode
  })
})
</script>
