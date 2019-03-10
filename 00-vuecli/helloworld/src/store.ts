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
    nextLabelID: 4,

    filter: null
  },

  getters: {
    filteredTasks(state: any) {
      if (!state.filter) {
        return state.tasks;
      }
      //if (state.filter === null) {
      //  return state.tasks;
      //}

      return state.tasks.filter((task: any) => {
        return task.labelIDs.indexOf(state.filter) >= 0;
      });
    }
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
      const filtered = state.tasks.filter((task: any) => {
        return task.id === id;
      });

      filtered.forEach((task: any) => {
        task.done = !task.done;
      });
    },

    addLabel(state, { text }) {
      state.labels.push({
        id: state.nextLabelID,
        text
      });
      state.nextLabelID++;
    },

    changeFilter(state, { filter }) {
      state.filter = filter;
    },

    restore(state, { tasks, labels, nextTaskID, nextLabelID }) {
      state.tasks = tasks;
      state.labels = labels;
      state.nextTaskID = nextTaskID;
      state.nextLabelID = nextLabelID;
    }
  },

  actions: {
    save({ state }) {
      const data = {
        tasks: state.tasks,
        labels: state.labels,
        nextTaskID: state.nextTaskID,
        nextLabelID: state.nextLabelID
      };
      localStorage.setItem("task-app-data", JSON.stringify(data));
    },

    restore({ commit }) {
      const data = localStorage.getItem("task-app-data");
      if (data) {
        commit("restore", JSON.parse(data));
      }
    }
  }
});

export default store;
