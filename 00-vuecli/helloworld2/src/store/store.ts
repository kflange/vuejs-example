import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: 1,
        name: 'buy milk',
        labelIDs: [1, 2],
        done: false,
      },
      {
        id: 2,
        name: 'buy book',
        labelIDs: [1, 3],
        done: true,
      },
    ],
  },

  mutations: {

  },
  actions: {

  },
});
