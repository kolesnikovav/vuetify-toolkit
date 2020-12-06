<template>
  <div>
    <h1>Toolbar in components</h1>
    <span></span>
    <p>
      VTreeSelect, VDataGridSelect, VDateTimeSelect have an adjustable toolbar, for simplify user interaction.
    </p>
    <p>Toolbar properties:</p>
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
          <td>use-toolbar</td>
          <td>boolean</td>
          <td>false</td>
          <td>Use toolbar or not</td>
        </tr>
        <tr>
          <td>toolbar-commands</td>
          <td>Array</td>
          <td>'[]'</td>
          <td>Describe toolbar buttons and actions</td>
        </tr>
        <tr>
          <td>toolbar-position</td>
          <td>String</td>
          <td>'top-left'</td>
          <td>Designates where button have been placed</td>
        </tr>
        <tr>
          <td>toolbarFlat</td>
          <td>Boolean</td>
          <td>true</td>
          <td>Drow toolbar without shadow box</td>
        </tr>
        <tr>
          <td>toolbar-button-outlined</td>
          <td>Boolean</td>
          <td>true</td>
          <td>Applies outlined style for toolbar buttons</td>
        </tr>
        <tr>
          <td>toolbar-button-rounded</td>
          <td>Boolean</td>
          <td>true</td>
          <td>Applies rounded style for toolbar buttons</td>
        </tr>
        <tr>
          <td>toolbar-button-shaped</td>
          <td>Boolean</td>
          <td>true</td>
          <td>Applies shaped style for toolbar buttons</td>
        </tr>
        <tr>
          <td>toolbar-button-fab</td>
          <td>Boolean</td>
          <td>true</td>
          <td>Applies fab style for toolbar buttons</td>
        </tr>
        <tr>
          <td>toolbar-button-tile</td>
          <td>Boolean</td>
          <td>true</td>
          <td>Applies tile style for toolbar buttons</td>
        </tr>
        <tr>
          <td>toolbar-button-text-visible</td>
          <td>Boolean</td>
          <td>false</td>
          <td>Display command text</td>
        </tr>
        <tr>
          <td>toolbar-button-elevation</td>
          <td>[Number, String]</td>
          <td>undefined</td>
          <td>Elevation of toolbar buttons</td>
        </tr>
        <tr>
          <td>toolbar-header</td>
          <td>String</td>
          <td>undefined</td>
          <td>The header of toolbar</td>
        </tr>
        <tr>
          <td>toolbar-has-divider</td>
          <td>Boolean</td>
          <td>true</td>
          <td>Place divider beetween toolbar and menu content</td>
        </tr>
        <tr>
          <td>toolbar-style</td>
          <td>Object</td>
          <td>undefined</td>
          <td>Style object for customize toolbar</td>
        </tr>
        <tr>
          <td>toolbar-header-style</td>
          <td>Object</td>
          <td>undefined</td>
          <td>Style object for customize toolbar header</td>
        </tr>
        <tr>
          <td>toolbar-height</td>
          <td>[Number, String]</td>
          <td>undefined</td>
          <td>Sets the height of toolbar</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
  })
})
</script>
