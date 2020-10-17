<template>
  <v-dialog
    v-model="modal_edit_json_data"
    max-width="800"
    persistent
  >
    <v-card>
      <v-card-title>Редактирование JSON-данных</v-card-title>
      <v-card-text>
        <v-row class="justify-end">
          <v-col class="fix-flex">
            <v-btn
              @click="showModalEditJSONElement()"
            >Добавить элемент в массив
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-data-table
              class="table--fix-icons"
              :items="JSON_data"
              :headers="headers_table"
              hide-default-footer
            >
              <template v-slot:item.actions="{ item }">
                <v-icon
                  small
                  @click="deleteJsonElement(item)"
                >delete
                </v-icon>
                <v-icon
                  small
                  @click="showModalEditJSONElement(item)"
                >edit
                </v-icon>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-col class="fix-flex">
            <v-btn
              @click="closeModalEditJsonData()"
            >
              <v-icon>clear</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from "vue-class-component";
  import { Getter, Action, Mutation } from "vuex-class";
  import { JSONDataElement } from "./types";

  const namespace = 'constructor';

  @Component({})

  export default class ModalJsonData extends Vue {
      @Getter('getJsonData', {namespace}) JSON_data: Array<JSONDataElement>;
      @Getter('getModalEditJsonData', {namespace}) modal_edit_json_data: any;
      @Action('deleteElementFromJsonData', {namespace}) deleteElementFromJsonData: any;
      @Mutation('showModalEditJSONElement', {namespace}) showModalEditJSONElement: any;
      @Mutation('closeModalEditJsonData', {namespace}) closeModalEditJsonData: any;
      @Getter('getSelectedItem', {namespace}) getSelectedItem: any;
      @Action('cutSelectedItems', {namespace}) cutSelectedItems: any;

      headers_table: Array<object> = [
          {text: 'Код поля', value: 'code', sortable: false},
          {text: 'Название поля', value: 'caption', sortable: false},
          {text: 'Тип данных в поле', value: 'type', sortable: false},
          {text: '', value: 'actions', align: 'end', sortable: false}
      ]


      deleteJsonElement(element_data: JSONDataElement): void {
          let _selected_element = Object.assign({}, element_data);
          if (confirm(`Удалить поле "${element_data.caption}"? ${_selected_element ? 'Поле уже выбрано -> его удаление приведет к его убиранию из выбранных' : ''}`)) {
              this.deleteElementFromJsonData(element_data.code);
              this.cutSelectedItems([element_data]);
          }
      }
  }
</script>
