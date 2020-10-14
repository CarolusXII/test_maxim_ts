import { RootState } from '../types'
import { ActionTree } from 'vuex'
import { ConstructorState } from './types'
import { JSONDataElement, ArrayItem } from '../../components/types'

export const actions: ActionTree<ConstructorState, RootState> = {
  getDataFromLS: ({commit}) => {
    let ls_data = localStorage.getItem('test_maxim_json_data');
    commit('setJSONData', ls_data ? JSON.parse(ls_data) : []);
  },
  getSelectedItemsFromLS: ({commit}) => {
    let ls_data = localStorage.getItem('test_main_selected_items');
    commit('setSelectedItems', ls_data ? JSON.parse(ls_data) : []);
  },
  addSelectedItems: ({commit, dispatch, getters}, _active_items: Array<JSONDataElement>) => {
    let active_items = JSON.parse(JSON.stringify(_active_items));
    active_items = active_items.map((ai: ArrayItem) => {
      ai['value'] = undefined;
      ai['condition'] = {};
      return ai;
    })
    let selected_items = getters['getSelectedItems'];
    commit('setSelectedItems', selected_items.concat(active_items));
  },
  cutSelectedItems: ({commit, dispatch, getters, rootGetters}, _deactive_items: Array<JSONDataElement>) => {
    let selected_items = getters['getSelectedItems'];
    let new_selected_items_val = rootGetters.getNotIntersectionArray(selected_items, _deactive_items, 'code');
    commit('setSelectedItems', new_selected_items_val);
  },
}
