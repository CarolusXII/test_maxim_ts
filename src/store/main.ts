import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from "./types";

import { constructor } from './constructor/main'
import { ArrayItem } from '../components/types'

Vue.use(Vuex)

const devtools: boolean = false;

const store: StoreOptions<RootState> = {
  devtools,
  getters: {
    getNotIntersectionArray: state => (_target_arr: Array<object> = [], _comparison_arr: Array<object> = [], _check_field: string = 'id'): Array<object> => {
      let target_arr = [].concat(_target_arr), comparison_arr = [].concat(_comparison_arr);
      if (_check_field !== undefined) {
        return target_arr.filter(ta => comparison_arr.every(ca => ca[_check_field] !== ta[_check_field]));
      } else {
        return target_arr.filter(ta => comparison_arr.every(ca => ca !== ta));
      }
    },
    getIntersectionArray: state => (_target_arr: Array<object> = [], _comparison_arr: Array<object> = [], _check_field: string = 'id'): Array<object> => {
      let target_arr = [].concat(_target_arr), comparison_arr = [].concat(_comparison_arr);
      if (_check_field !== undefined) {
        return target_arr.filter(ta => comparison_arr.some(ca => ca[_check_field] === ta[_check_field]));
      } else {
        return target_arr.filter(ta => comparison_arr.some(ca => ca === ta));
      }
    }
  },
  actions: {
    getFreeIndex: async ({getters}) => {
      let index = 0;
      while (getters.getJsonData.some((i: ArrayItem) => i.code.replace('field', '') == index)) {
        index++;
      }
      return index;
    }
  },
  modules: {
    constructor
  }
}

export default new Vuex.Store<RootState>(store)
