<template>
  <v-app>
    <v-navigation-drawer :clipped="$vuetify.breakpoint.lgAndUp" app v-model="drawer">
      <v-list dense>
        <v-list-item dense>
          <v-list-item-action>
            <v-btn text :to="{path: '/'}">Quick Start</v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider />
        <v-subheader>Components</v-subheader>
        <v-list-item dense>
          <v-list-item-action>
            <v-btn text :to="{path: '/treeselect'}">VTreeSelect</v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item dense>
          <v-list-item-action>
            <v-btn text :to="{path: '/cascader'}">VCascader</v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item dense>
          <v-list-item-action>
            <v-btn text :to="{path: '/datagridselect'}">VDataGridSelect</v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item dense>
          <v-list-item-action>
            <v-btn text :to="{path: '/datetimeselect'}">VDateTimeSelect</v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item dense>
          <v-list-item-action>
            <v-btn text :to="{path: '/mdview'}">VMdView</v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item dense>
          <v-list-item-action>
            <v-btn text :to="{path: '/advdatatable'}">VAdvDataTable</v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item dense>
          <v-list-item-action>
            <v-btn text :to="{path: '/tooltipbtn'}">VTooltipBtn</v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-subheader>Mixins</v-subheader>
        <v-list-item dense>
          <v-list-item-action>
            <v-btn text :to="{path: '/comandtoolbar'}">ComandToolbar</v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item dense>
          <v-list-item-action>
            <v-btn text :to="{path: '/contextmenu'}">ContextMenu</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">VUETIFY-TOOLKIT Components examples & usage</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon large href = "https://github.com/kolesnikovav/vuetify-toolkit">
        GitHub
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  data: () => ({
    drawer: null
  })
})
</script>

<style >
 .v-content__wrap {
   padding-top: 22px;
   padding-left: 100px;
   padding-right: 100px;
   padding-bottom: 22px;
   line-height: 1.5;
 }
 .v-markup {
    align-items: center;
    box-shadow: none;
    display: flex;
    border-radius: 4px;
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    margin-bottom: 16px;
    background: #2d2d2d;
    color: #fff;
}
.v-markup code {
    position: relative;
    box-shadow: none;
    overflow-x: auto;
    overflow-y: hidden;
    word-break: break-word;
    flex-wrap: wrap;
    align-items: center;
    vertical-align: middle;
    white-space: pre-wrap;
}
.component-parameters {
    font-size: 18px;
    color: blue
}
.code-text {
    background: none!important;
    color: lightyellow!important;
}
</style>
