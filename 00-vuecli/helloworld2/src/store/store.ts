import Vue from 'vue';
import Vuex from 'vuex';
import { ITaskList } from '@/store/modules/task';

Vue.use(Vuex);

export interface State {
  tasks: ITaskList;
}

export default new Vuex.Store({});
