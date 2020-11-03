<template>
  <div>
    <h1>VTooltipBtn</h1>
    <span></span>
    <p>
      VTooltipBtn is the combined button with icon and hint. This component is
      designed to simplify template markup
    </p>
    <p>Added properties are below</p>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header
          >Icon and style properties
        </v-expansion-panel-header>
        <v-expansion-panel-content>
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
                <td>headerIcon</td>
                <td>string</td>
                <td>undefined</td>
                <td>Determines header settings icon</td>
              </tr>
              <tr>
                <td>headerIconColor</td>
                <td>string</td>
                <td>undefined</td>
                <td>Settings icon color</td>
              </tr>
              <tr>
                <td>upIcon</td>
                <td>String</td>
                <td>'expand_more'</td>
                <td>The button icon to move header up</td>
              </tr>
              <tr>
                <td>downIcon</td>
                <td>string</td>
                <td>'expand_less'</td>
                <td>The button icon to move header down</td>
              </tr>
              <tr>
                <td>filterIcon</td>
                <td>string</td>
                <td>undefined</td>
                <td>Filter icon</td>
              </tr>
              <tr>
                <td>filterActiveIcon</td>
                <td>string</td>
                <td>undefined</td>
                <td>Filter icon when filter is active</td>
              </tr>
              <tr>
                <td>filterIconColor</td>
                <td>String</td>
                <td>'undefined'</td>
                <td>Default filter icon color</td>
              </tr>
              <tr>
                <td>filterActiveIconColor</td>
                <td>string</td>
                <td>'undefined'</td>
                <td>Filter icon color when it active</td>
              </tr>
              <tr>
                <td>filterActiveIconColor</td>
                <td>string</td>
                <td>'undefined'</td>
                <td>Filter icon color when it active</td>
              </tr>
            </tbody>
          </table>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header
          >Datatable header modifications
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p>Original vuetifyjs datatable header object is changed</p>
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
                <td>filterable</td>
                <td>boolean</td>
                <td>false</td>
                <td>Allow to use value filter</td>
              </tr>
              <tr>
                <td>datatype</td>
                <td>['number', 'date, 'string']</td>
                <td>'string'</td>
                <td>
                  Determines column datatype. If type is 'date' or 'number',
                  then compare for equal than, more than, less than and between
                  to becomes available
                </td>
              </tr>
            </tbody>
          </table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

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
        <v-tab-item>
          <div
            class="v-markup v-card v-card--outlined v-sheet theme--light grey darken-4"
          >
            <pre class="language-html">
           <code class="language-html code-text">{{sandboxTemplate}}</code>
          </pre>
          </div>
        </v-tab-item>
        <v-tab-item>
          <div
            class="v-markup v-card v-card--outlined v-sheet theme--light grey darken-4"
          >
            <pre class="language-javascript">
           <code class="language-javascript code-text">{{sandboxCode}}</code>
          </pre>
          </div>
        </v-tab-item>
      </v-tabs>
      <v-card-text>
        <v-row justify="space-around">
          <v-switch v-model="tile" class="ma-2" label="tile"></v-switch>
          <v-switch v-model="fab" class="ma-2" label="fab"></v-switch>
          <v-switch v-model="outlined" class="ma-2" label="outlined"></v-switch>
          <v-switch v-model="rounded" class="ma-2" label="rounded"></v-switch>
          <v-switch v-model="shaped" class="ma-2" label="shaped"></v-switch>
          <v-switch v-model="disabled" class="ma-2" label="disabled"></v-switch>
          <v-switch
            v-model="depressed"
            class="ma-2"
            label="depressed"
          ></v-switch>
          <v-select
            v-model="iconColor"
            class="ma-2"
            label="iconColor"
            :items="colors"
          ></v-select>
          <v-select
            v-model="currenticon"
            class="ma-2"
            label="icon"
            :items="icons"
          ></v-select>
          <v-text-field
            v-model="btnText"
            class="ma-2"
            label="Button text"
          ></v-text-field>
        </v-row>
        <v-row justify="space-around">
          <v-slider
            v-model="elevation"
            max="24"
            min="0"
            label="elevation"
          ></v-slider>
          <v-text-field
            v-model="hint"
            class="ma-2"
            label="Hint text"
          ></v-text-field>
        </v-row>
        <v-row align="center" justify="space-around">
          <v-tooltip-btn
            :tile="tile"
            :fab="fab"
            :rounded="rounded"
            :outlined="outlined"
            :shaped="shaped"
            :disabled="disabled"
            :depressed="depressed"
            :btnIcon="currenticon"
            :iconColor="iconColor"
            :hint="hint"
            :btnText="btnText"
            :elevation="elevation"
          ></v-tooltip-btn>
        </v-row>
      </v-card-text>
    </v-card>
    <span />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

const sandboxTemplateHTML =
  '<v-tooltip-btn\n' +
  ' :dense = "dense"\n' +
  ' :dark = "dark"\n' +
  '</v-tooltip-btn>\n'

const sandboxCode =
  'export default ({\n' +
  '  data: () => ({\n' +
  '    items: desserts, // see items\n' +
  '    dataGridHeaders: dataGridHeaders, // see headers\n' +
  '    multiple: false,\n' +
  '    dense: false,\n' +
  '    dark: false,\n' +
  '    customSlots: false,\n' +
  '  }),\n' +
  '})'

export default Vue.extend({
  data: () => ({
    hint: 'This is tooltip text for my button',
    btnText: 'My button',
    tile: false,
    fab: false,
    rounded: false,
    outlined: false,
    shaped: false,
    disabled: false,
    depressed: false,
    iconColor: 'error',
    colors: ['success', 'error', 'primary'],
    icons: ['', 'mdi-close', 'mdi-check-bold', 'mdi-upload'],
    currenticon: '',
    elevation: 4,
    dark: false,

    codeSandbox: false,
    sandboxTemplate: sandboxTemplateHTML,
    sandboxCode: sandboxCode
  })
})
</script>
