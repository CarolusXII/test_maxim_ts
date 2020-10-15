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
  addElementInJsonData: (state, payload) => {
    payload.element['code'] = `field${payload.index}`;
    state.JSON_data.push(payload.element);
  },
  updateElementInJsonData: (state, JSON_element) => {
    let json_data_element = state.JSON_data.find(jdi => jdi.code == JSON_element.code);
    json_data_element.caption = JSON_element.caption;
    json_data_element.type = JSON_element.type;
  },
  removeElementFromJsonData: (state, code: string) => {
    state.JSON_data = state.JSON_data.filter(jdi => jdi.code != code);
  },
  showModalEditJsonData: state => {
    state.modal_edit_json_data = true;
  },
  closeModalEditJsonData: state => {
    state.modal_edit_json_data = false;
  }
}
