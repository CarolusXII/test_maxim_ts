import { Module } from 'vuex'
import { RootState } from '../types';
import { ConstructorState } from './types';

import { mutations } from './mutations';
import { actions } from './actions'
import { getters } from './getters';
import { state } from './state';

const namespaced: boolean = true;

export const constructor: Module<ConstructorState, RootState> = {
  namespaced,
  mutations,
  actions,
  getters,
  state
}
