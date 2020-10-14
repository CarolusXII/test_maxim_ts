<template>
  <v-app>
    <v-main>
      <constructor></constructor>
    </v-main>
  </v-app>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import Constructor from './components/constructor.vue'

    @Component({
        name: 'App',
        components: {
            Constructor
        }
    })

    export default class App extends Vue {}
</script>

<style lang="scss">
  .fix-flex {
    flex-grow: 0!important;
  }
</style>
