<template>
  <v-col cols="12" sm="12" md="10" lg="8" v-resize="resize">
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
    import {Watch} from 'vue-property-decorator'
    import {Getter, Action} from 'vuex-class'
    import {
        ElementsSelector,
        JSONDataElement,
        EditJsonDataElement,
        EditJSONDataElementDataEmpty,
        SelectedItemsElement,
        ConditionObj
    } from './types'

    const namespace = 'constructor';

    @Component({
        components: {
            ElementPicker
        }
    })
    export default class Constructor extends Vue {
        @Action('getDataFromLS', {namespace}) getDataFromLS: any;
        @Action('getSelectedItemsFromLS', {namespace}) getSelectedItemsFromLS: any;
        @Action('addSelectedItems', {namespace}) addSelectedItems: Array<JSONDataElement>;
        @Action('cutSelectedItems', {namespace}) cutSelectedItems: Array<JSONDataElement>;
        @Getter('getSelectedItems', {namespace}) selected_items: Array<SelectedItemsElement>;
        @Getter('getJsonData', {namespace}) JSON_data: Array<JSONDataElement>;
        @Getter('getIntersectionArray') getIntersectionArray: Array<JSONDataElement>;
        @Getter('getNotIntersectionArray') getNotIntersectionArray: Array<JSONDataElement>;
        @Getter('getConditionSelectedItem', {namespace}) getConditionSelectedItem: ConditionObj;

        @Watch('JSON_data') JSON_data_watcher(new_val: Array<JSONDataElement>) {
            localStorage.setItem('test_maxim_json_data', JSON.stringify(new_val));
        }

        @Watch('selected_items', {deep: true}) selected_items_watcher(new_val: Array<SelectedItemsElement>) {
            localStorage.setItem('test_main_selected_items', JSON.stringify(new_val));
        }

        mounted(): void {
            this.init();
        }

        edit_json_data_element: EditJsonDataElement = {
            title: undefined,
            data: {},
            modal: false
        }
        edit_json_data_element_data_empty: EditJSONDataElementDataEmpty = {
            code: undefined,
            caption: undefined,
            type: undefined
        }
        elements_selector: ElementsSelector = {
            active_items: [],
            deactive_items: []
        }
        mobile: boolean = false;

        init() {
            console.log('init()');
            this.getDataFromLS();
            this.getSelectedItemsFromLS();
        }

        resize() {
            this.mobile = window.innerWidth < 600;
        }

        showModalEditSettings(_data: JSONDataElement | undefined = undefined) {
            if (_data) {
                this.edit_json_data_element.title = 'Изменение данных JSON-элемента';
                this.edit_json_data_element.data = Object.assign({}, _data);
            } else {
                this.edit_json_data_element.title = 'Создание JSON-элемента';
            }
            this.edit_json_data_element.modal = true;
        }

        closeModalEditJsonElement() {
            this.edit_json_data_element.modal = false;
            setTimeout(() => {
                this.edit_json_data_element.data = Object.assign({}, this.edit_json_data_element_data_empty);
                this.edit_json_data_element.title = undefined;
                //this.$refs.form_edit_json_data_element.resetValidation();
            }, 300)
        }
    }
</script>

