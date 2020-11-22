<template>
  <div>
    <h1>VContextMenu</h1>
    <span></span>
    <p>
      This component is designed to handle context-menu event instead of browser
      default. You only need define availible command in any vuetify component.
    </p>
    <p>
      This component extends
      <a href="https://vuetifyjs.com/en/components/autocompletes"
        >VAutocomplete</a
      >
      component. It contains all properties, slots, events of extended
      component. Because items can be nested, component includes some
      properties, similiar as VTreeSelect component.
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
        <tr>
          <td>show-full-path</td>
          <td>boolean</td>
          <td>true</td>
          <td>Show item with all parents in selection</td>
        </tr>
        <tr>
          <td>delimeter</td>
          <td>string</td>
          <td>','</td>
          <td>Delimeter between item and parent</td>
        </tr>
      </tbody>
    </table>
    <span />
    <h2>Sandbox</h2>
    <v-card max-width="500" class="mx-auto">
      <v-toolbar color="indigo" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Inbox</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list :contextMenuCommands="cm">
        <v-list-item v-for="item in items" :key="item.title" :contextMenuItem = "item">
          <v-list-item-icon>
            <v-icon v-if="item.icon" color="pink"> mdi-star </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>

          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>
        </v-list-item>
      </v-list>
    </v-card>
    <span />
    <h2>Examples</h2>
    <h3>v-cascader example (chips selections)</h3>
    <v-cascader
      :items="items"
      :itemText="name"
      item-key="name"
      clearable
    ></v-cascader>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

/*eslint-disable*/
const cm = [
  {
    icon: "mdi-close",
    iconColor: "red",
    text: "Delete",
    action: "Delete",
    disabled: () => false,
  },
  {
    icon: "mdi-upload",
    iconColor: "red",
    text: "Refresh",
    action: "",
    disabled: () => false,
  },
];

const sandboxTemplateHTML = `<v-cascader
    :autocomplete="autocomplete"
    :chips="chips"
    :dense="dense"
    :itemText="name"
    :multiple="multiple"
    :items="items"
    :clearable="clearable"
    :dark="dark"
    >
'</v-cascader>`;

const sandboxCode = `export default ({
  data: () => ({
    items: ofices, // see data source
    chips: false,
    multiple: false,
    dense: false,
    clearable: false,
    dark: false,
    autocomplete: false,
  })
})`;

export default Vue.extend({
  data: () => ({
    cm: cm,
    items: [
      {
        icon: true,
        title: "Jason Oner",
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      },
      {
        title: "Travis Howard",
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
      },
      {
        title: "Ali Connors",
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
      },
      {
        title: "Cindy Baker",
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
      },
    ],
  }),
  methods: {
    Delete () {
      alert((this as any).contextMenuItem)
    }
  }
});
</script>
