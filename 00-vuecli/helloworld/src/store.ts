import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store: any = new Vuex.Store({
  state: {
    tasks: [
      {
        id: 1,
        name: "buy milk",
        done: false
      },
      {
        id: 2,
        name: "buy book",
        done: true
      }
    ],
    nextTaskID: 3
  },

  mutations: {
    addTask(state, { name }) {
      state.tasks.push({
        id: state.nextTaskID,
        name,
        done: false
      });
      state.nextTaskID++;
    },

    toggleTaskStatus(state, { id }) {
      const filtered = state.tasks.filter(task => {
        return task.id === id;
      });

      filtered.forEach(task => {
        task.done = !task.done;
      });
    }
  }
});

export default store;
