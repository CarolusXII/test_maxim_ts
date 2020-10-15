<template>
  <v-col cols="12" sm="12" md="10" lg="8" v-resize="resize">
    <modal-json-data></modal-json-data>
    <modal-edit-json-data-element></modal-edit-json-data-element>

    <v-row>
      <v-spacer></v-spacer>
      <v-col class="fix-flex">
        <v-btn
          @click="showModalEditJsonData()"
        >Изменение массива данных конструктора
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="space-between">
      <v-col cols="12" sm="5">
        <element-picker
          title="Все фильтры"
          :items="getNotIntersectionArray(JSON_data, selected_items, 'code')"
          v-model="elements_selector.active_items"
          item_value="code"
          item_text="caption"
        ></element-picker>
      </v-col>
      <v-col class="fix-flex">
        <v-row class="buttons-action-wrapper">
          <v-col class="fix-flex">
            <v-btn
              @click="addSelectedItems(elements_selector.active_items)"
            >
              <v-icon>
                <template v-if="!mobile">keyboard_arrow_right</template>
                <template v-else>keyboard_arrow_down</template>
              </v-icon>
            </v-btn>
          </v-col>
          <v-col class="fix-flex">
            <v-btn
              @click="cutSelectedItems(elements_selector.deactive_items)"
            >
              <v-icon>
                <template v-if="!mobile">keyboard_arrow_left</template>
                <template v-else>keyboard_arrow_up</template>
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="5">
        <element-picker
          title="Выбранные фильтры"
          :items="getIntersectionArray(JSON_data, selected_items,'code')"
          v-model="elements_selector.deactive_items"
          item_value="code"
          item_text="caption"
        >
          <template v-slot:info="props">
            <v-tooltip bottom
                       v-if="Object.keys(getConditionSelectedItem(props.item.code)).length"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                  class="error--text"
                >error_outline
                </v-icon>
              </template>
              <span>У данного элемента уже заданы какие-то условия</span>
            </v-tooltip>
          </template>
          <template v-slot:action="props">
            <v-btn
              class="ml-1"
              fab
              x-small
              @click.stop="showModalEditSettings(props.item)"
            >
              <v-icon>settings</v-icon>
            </v-btn>
          </template>
        </element-picker>
      </v-col>
    </v-row>
  </v-col>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import ElementPicker from './element_picker.vue'
    import ModalEditJsonDataElement from './modal_edit_json_data_element.vue'
    import ModalJsonData from './modal_json_data.vue'
    import {Watch} from 'vue-property-decorator'
    import {Getter, Action, Mutation} from 'vuex-class'
    import {
        ElementsSelector,
        JSONDataElement,
        SelectedItemsElement,
        ConditionObj
    } from './types'

    const namespace = 'constructor';

    @Component({
        components: {
            ElementPicker,
            ModalEditJsonDataElement,
            ModalJsonData
        }
    })
    export default class Constructor extends Vue {
        @Action('getDataFromLS', {namespace}) getDataFromLS: any;
        @Action('getSelectedItemsFromLS', {namespace}) getSelectedItemsFromLS: any;
        @Action('addSelectedItems', {namespace}) addSelectedItems: any;
        @Action('cutSelectedItems', {namespace}) cutSelectedItems: any;

        @Mutation('showModalEditJsonData', {namespace}) showModalEditJsonData: any;

        // @Action('deleteElementFromJsonData', {namespace}) deleteElementFromJsonData: any;
        @Getter('getSelectedItems', {namespace}) selected_items: Array<SelectedItemsElement>;
        @Getter('getSelectedItem', {namespace}) getSelectedItem: any;
        @Getter('getJsonData', {namespace}) JSON_data: Array<JSONDataElement>;
        @Getter('getIntersectionArray') getIntersectionArray: Array<JSONDataElement>;
        @Getter('getNotIntersectionArray') getNotIntersectionArray: Array<JSONDataElement>;

        @Getter('getConditionSelectedItem', {namespace}) getConditionSelectedItem: ConditionObj;

        @Watch('JSON_data', {deep: true}) JSON_data_watcher(new_val: Array<JSONDataElement>) {
            localStorage.setItem('test_maxim_json_data', JSON.stringify(new_val));
        }

        @Watch('selected_items', {deep: true}) selected_items_watcher(new_val: Array<SelectedItemsElement>) {
            localStorage.setItem('test_main_selected_items', JSON.stringify(new_val));
        }

        mounted(): void {
            this.init();
        }

        elements_selector: ElementsSelector = {
            active_items: [],
            deactive_items: []
        }
        mobile: boolean = false;


        init(): void {
            console.log('init()');
            this.getDataFromLS();
            this.getSelectedItemsFromLS();
        }

        resize(): void {
            this.mobile = window.innerWidth < 600;
        }

    }
</script>

