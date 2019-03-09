import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store: any = new Vuex.Store({
  state: {
    tasks: [
      {
        id: 1,
        name: "buy milk",
        labelIDs: [1, 2],
        done: false
      },
      {
        id: 2,
        name: "buy book",
        labelIDs: [1, 3],
        done: true
      }
    ],

    labels: [
      {
        id: 1,
        text: "buy"
      },
      {
        id: 2,
        text: "food"
      },
      {
        id: 3,
        text: "book"
      }
    ],

    nextTaskID: 3,
    nextLabelID: 4
  },

  mutations: {
    addTask(state, { name, labelIDs }) {
      state.tasks.push({
        id: state.nextTaskID,
        name: name,
        labelIDs: labelIDs,
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
    },

    addLabel(state, { text }) {
      state.labels.push({
        id: state.nextLabelID,
        text
      });
      state.nextLabelID++;
    }
  }
});

export default store;
