import Vue from 'vue';
import Vuex from 'vuex';
import { ITaskList } from '@/store/modules/task';
import { ILabelList } from '@/store/modules/label';

Vue.use(Vuex);

export interface State {
  tasks: ITaskList;
  labels: ILabelList;
}

export default new Vuex.Store<State>({});
