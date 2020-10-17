<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-col>Данные запроса</v-col>
        <v-col>{{ request_data }}</v-col>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from "vue-class-component"
    import {Getter} from "vuex-class";

    const namespace = 'constructor';

    @Component({})

    export default class RequestData extends Vue {
        @Getter('getRequestData', {namespace}) request_data: any;
    }
</script>
