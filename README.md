# vuetify-toolkit


<p align="left">
  <a href="https://travis-ci.org/kolesnikovav/vuetify-toolkit/master">
    <img alt="Travis (.org) branch" src="https://img.shields.io/travis/kolesnikovav/vuetify-toolkit/master?logo=travis">
  </a>
  <a href="https://www.npmjs.com/package/vuetify-toolkit">
    <img alt="npm" src="https://img.shields.io/npm/v/vuetify-toolkit?color=blue&logo=npm">
  </a>
  <a href="https://www.npmjs.com/package/vuetify-toolkit">
    <img alt="npm" src="https://img.shields.io/npm/dm/vuetify-toolkit?logo=npm">
  </a>
</p>

The set of additional vuetify components, for using with [vuetify.js](https://vuetifyjs.com/) library

## Live demo

See [Live demo & documentation](https://kolesnikovav.github.io/vuetify-toolkit/).


## Components

 - VDataGridSelect
 The selector with Tabular items presentation
 [Examples & Sandbox](https://kolesnikovav.github.io/vuetify-toolkit)
 - VDateTimeSelect
 Easy to use datetime selector
 [Examples & Sandbox](https://kolesnikovav.github.io/vuetify-toolkit)
 - VCascader
 Cascade selection box
 [Examples & Sandbox](https://kolesnikovav.github.io/vuetify-toolkit)
 - VTreeSelect
 Selector for nested & tree like items
  [Examples & Sandbox](https://kolesnikovav.github.io/vuetify-toolkit)
 - VMdView
 Displaying any hierarchical data (like file explorer)
  [Examples & Sandbox](https://kolesnikovav.github.io/vuetify-toolkit)
 - VAdvDataTable
 Data table with columns visibitity and order settings by user
  [Examples & Sandbox](https://kolesnikovav.github.io/vuetify-toolkit)
 - VTooltipBtn
 Button with icon, text and hint
  [Examples & Sandbox](https://kolesnikovav.github.io/vuetify-toolkit)

## Installation

```
yarn add vuetify-toolkit
```
or
```
npm i vuetify-toolkit --save
```

### Basic usage

Change your src/plugins/vuetify.js file as follows
```
      import Vue from 'vue';
      import Vuetify from 'vuetify/lib';

      import {
        VTreeSelect,
        VCascader,
        VDataGridSelect,
        VDateTimeSelect,
        VAdvDataTable,
        VMdView } from 'vuetify-toolkit/vuetify-toolkit.umd'
      Vue.use(Vuetify,{
          VTreeSelect,
          VCascader,
          VDataGridSelect,
          VDateTimeSelect,
          VAdvDataTable,
          VMdView
      });
      export default new Vuetify({
        icons: {
        iconfont: 'mdi',
        },
      });
```
Then, you can use this components as

```
<template>
  <div>
    <v-tree-select>
      <!--  -->
    </v-tree-select>
    <v-cascader>
      <!--  -->
    </v-cascader>
    <v-data-grid-select>
      <!--  -->
    </v-data-grid-select>
    <v-date-time-select>
      <!--  -->
    </v-date-time-select>
    <v-adv-data-table>
      <!--  -->
    </v-adv-data-table>
    <v-md-view>
      <!--  -->
    </v-md-view>
  </div>
</template>
```

### CDN usage

You can use this library directly via cdn.
Bellow is the example how you can do it
```
<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/vuetify-toolkit@0.3.x/vuetify-toolkit.css rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
</head>
<body>
  <div id="app">
    <v-app>
      <v-main>
        <v-tree-select/>
        <v-container>Hello world</v-container>
      </v-main>
    </v-app>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vuetify-toolkit@0.3.x/vuetify-toolkit.umd.js"></script>
  <script>
    new Vue({
      el: '#app',
      vuetify: new Vuetify(),
    })
  </script>
</body>
</html>
```

### Hello world example

[Here](https://github.com/kolesnikovav/testapp) is the sample project with vuetify-toolkit, built with [vue cli](https://cli.vuejs.org/)

### Codesandbox example

[See](https://codesandbox.io/s/ritcx)

### Contributing

Any help for this project are welcome.
Please read the [Contributing Guide](./CONTRIBUTING.md)