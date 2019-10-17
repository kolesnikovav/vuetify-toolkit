<template>
  <v-card flat>
    <v-card-title>
      <v-layout>
        <v-flex xs4>
          <p>Name</p>
        </v-flex>
        <v-flex xs4>
          <p>Type</p>
        </v-flex>
        <v-flex xs4>
          <p>Default</p>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-text>
      <div v-for="item in items" :key="item">
        <v-layout>
          <v-flex xs4 left>
            <p class = "component-parameters">{{item.name}}</p>
          </v-flex>
          <v-flex xs4>
            <p class = "component-parameters">{{item.type}}</p>
          </v-flex>
          <v-flex xs4>
            <p class = "component-parameters">{{item.default}}</p>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <p>{{item.describtion}}</p>
          </v-flex>
        </v-layout>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'v-api-props',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>
</style>
