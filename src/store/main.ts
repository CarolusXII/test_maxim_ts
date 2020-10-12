import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from "./types";

import { constructor } from './constructor/main'

Vue.use(Vuex)

const devtools: boolean = false;

const store: StoreOptions<RootState> = {
  devtools,
  getters: {
    getNotIntersectionArray: state => (_target_arr: Array<any> = [], _comparison_arr: Array<any> = [], _check_field: any = undefined) => {
      let target_arr = [].concat(_target_arr), comparison_arr = [].concat(_comparison_arr);
      if (_check_field !== undefined) {
        return target_arr.filter(ta => comparison_arr.every(ca => ca[_check_field] !== ta[_check_field]));
      } else {
        return target_arr.filter(ta => comparison_arr.every(ca => ca !== ta));
      }
    },
    getIntersectionArray: state => (_target_arr: Array<any> = [], _comparison_arr: Array<any> = [], _check_field: any = undefined) => {
      console.log(2)
      let target_arr = [].concat(_target_arr), comparison_arr = [].concat(_comparison_arr);
      if (_check_field !== undefined) {
        return target_arr.filter(ta => comparison_arr.some(ca => ca[_check_field] === ta[_check_field]));
      } else {
        return target_arr.filter(ta => comparison_arr.some(ca => ca === ta));
      }
    }
  },
  modules: {
    constructor
  }
}

export default new Vuex.Store<RootState>(store)
