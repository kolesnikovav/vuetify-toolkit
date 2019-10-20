# vuetify-toolkit

[![Build Status](https://travis-ci.org/kolesnikovav/vuetify-toolkit.svg?branch=master)](https://travis-ci.org/kolesnikovav/vuetify-toolkit)

The set of additional vuetify components, that not included in vuetify.js library
Working  in progress now.

## status 
Current status is pre-alpha. Not ready for production use!

## Live demo

See [Live demo & documentation](https://kolesnikovav.github.io/vuetify-toolkit/).


## Components

 - VDataGridSelect
 The selector with Tabular items presentation
 [Examples & Sandbox](https://kolesnikovav.github.io/vuetify-toolkit)
 - VCascader
 Cascade selection box
 [Examples & Sandbox](https://kolesnikovav.github.io/vuetify-toolkit)
 - VTreeSelect
 Selector for nested & tree like items
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

      import {VTreeSelect, VCascader, VDataGridSelect } from 'vuetify-toolkit/vuetify-toolkit.umd'
      Vue.use(Vuetify,{
          VTreeSelect,
          VCascader,
          VDataGridSelect
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
  </div>
</template>
```