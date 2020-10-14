import { MutationTree } from 'vuex';
import { ConstructorState } from './types'
import { JSONDataElement, SelectedItemsElement } from '../../components/types'

export const mutations: MutationTree<ConstructorState> = {
  setJSONData: (state, json_data: Array<JSONDataElement>) => {
    state.JSON_data = json_data;
  },
  setSelectedItems: (state, selected_items: Array<SelectedItemsElement>) => {
    state.selected_items = selected_items;
  },
}
