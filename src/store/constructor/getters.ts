import { GetterTree } from 'vuex';
import { ConstructorState } from './types';
import { RootState } from '../types';
import { JSONDataElement, SelectedItemsElement, ConditionObj } from '../../components/types'

export const getters: GetterTree<ConstructorState, RootState> = {
  getJsonData: (state):Array<JSONDataElement> => {
    return state.JSON_data;
  },
  getSelectedItems: (state): Array<SelectedItemsElement> => {
    return state.selected_items;
  },
  getTypes: state => {
    return Object.keys(state.types_map);
  },
  getConditionSelectedItem: state => (id: string): ConditionObj  => {
    return state.selected_items.find(si => si.code === id).condition;
  },
  getSelectedItem: state => (id: string): SelectedItemsElement => {
    return state.selected_items.find(si => si.code === id);
  },
  getEditJSONDataElement: state => {
    return state.edit_json_data_element;
  },
  getRules: state => (type: string) => {
    return state.rules[type] === undefined ? () => {} : state.rules[type];
  },
  getModalEditJsonData: state => {
    return state.modal_edit_json_data;
  }
}
