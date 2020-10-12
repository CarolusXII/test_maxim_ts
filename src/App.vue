<template>
  <v-app>
    <v-main>
      <v-container grid-list-md fluid>
        <element-picker
          :items="items"
          v-model="selected_items"
          item_text="name"
        ></element-picker>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'

    import ElementPicker from './components/element_picker.vue'

    interface Obj {
        [index: string]: string;
    }

    @Component({
        name: 'App',
        components: {
            ElementPicker
        }
    })

    export default class App extends Vue {
        items: Array<object> = [
            {name: 'Alesha', age: 23, id: 0},
            {name: 'Valera', age: 27, id: 1},
            {name: 'Sergey', age: 19, id: 2},
        ]
        selected_items: object[] = [];
    }
</script>

<style lang="scss">
  .fix-flex {
    flex-grow: 0!important;
  }
</style>
