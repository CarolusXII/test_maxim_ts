import {MutationTree} from 'vuex';
import {ConstructorState} from './types'
import {JSONDataElement, SelectedItemsElement, ArrayItem} from '../../components/types'

export const mutations: MutationTree<ConstructorState> = {
  setJSONData: (state, json_data: Array<JSONDataElement>) => {
    state.JSON_data = json_data;
  },
  setSelectedItems: (state, selected_items: Array<SelectedItemsElement>) => {
    state.selected_items = selected_items;
  },
  showModalEditJSONElement: (state, JSON_element: JSONDataElement = undefined) => {
    if (JSON_element) {
      state.edit_json_data_element.data = Object.assign({}, JSON_element);
      state.edit_json_data_element.title = 'Изменение данных JSON-элемента';
    } else {
      state.edit_json_data_element.title = 'Создание JSON-элемента';
    }
    state.edit_json_data_element.modal = true;
  },
  closeModalEditJSONElement: state => {
    state.edit_json_data_element.modal = false;
    state.edit_json_data_element.data = Object.assign({}, state.edit_json_data_element_data);
  },
  addElementInJsonData: (state, payload: { element: JSONDataElement; index: number }) => {
    payload.element['code'] = `field${payload.index}`;
    state.JSON_data.push(payload.element);
  },
  updateElementInJsonData: (state, JSON_element: JSONDataElement) => {
    let json_data_element = state.JSON_data.find(jdi => jdi.code == JSON_element.code);
    json_data_element.caption = JSON_element.caption;
    json_data_element.type = JSON_element.type;

    let selected_item = state.selected_items.find(si => si.code === JSON_element.code);
    selected_item.caption = JSON_element.caption;
    if (selected_item.type !== JSON_element.type) {
      selected_item.type = JSON_element.type;
      selected_item.value = undefined;
      selected_item.condition = {};
    }
  },
  removeElementFromJsonData: (state, code: string) => {
    state.JSON_data = state.JSON_data.filter(jdi => jdi.code != code);
  },
  showModalEditJsonData: state => {
    state.modal_edit_json_data = true;
  },
  closeModalEditJsonData: state => {
    state.modal_edit_json_data = false;
  },
  updateSelectedItem: (state, _selected_item: SelectedItemsElement) => {
    let selected_item: SelectedItemsElement = state.selected_items.find(si => si.code === _selected_item.code);
    selected_item.caption = _selected_item.caption;
    let change_condition_flag = false;
    let old_condition_keys: Array<string> = Object.keys(selected_item.condition).sort((a, b) => a < b ? -1 : 1);
    let new_condition_keys: Array<string> = Object.keys(_selected_item.condition).sort((a, b) => a < b ? -1 : 1);
    if (new_condition_keys.length !== old_condition_keys.length) {
      change_condition_flag = true;
    } else {
      for (let key of new_condition_keys) {
        if (selected_item.condition[key] !== _selected_item.condition[key]) {
          change_condition_flag = true;
          break;
        }
      }
    }
    if (selected_item.type !== _selected_item.type || change_condition_flag) {
      selected_item.value = undefined;
    }
    selected_item.type = _selected_item.type;
    selected_item.condition = Object.assign({}, _selected_item.condition);
  },
  showModalEditSettings: (state, _selected_item: JSONDataElement) => {
    let selected_item = state.selected_items.find(si => si.code == _selected_item.code);
    state.edit_settings.data = JSON.parse(JSON.stringify(selected_item));
    state.edit_settings.condition_data = state.types_map[_selected_item.type] || {};
    state.edit_settings.modal = true;
  },
  closeModalEditSettings: state => {
    state.edit_settings.modal = false;
    state.edit_settings.data = {};
    state.edit_settings.condition_data = {};
  }
}
