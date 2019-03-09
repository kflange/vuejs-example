<template>
  <div>
    <h2>task list</h2>
    <ul>
      <li v-for="task in tasks" v-bind:key="task.id">
        <input
          type="checkbox"
          v-bind:checked="task.done"
          v-on:change="toggleTaskStatus(task)"
        />
        {{ task.name }}
        -
        <span v-for="id in task.labelIDs" v-bind:key="id">
          {{ getLabelText(id) }}
        </span>
      </li>
    </ul>

    <form v-on:submit.prevent="addTask">
      <input type="text" v-model="newTaskName" placeholder="new task" />
    </form>

    <h2>label list</h2>
    <ul>
      <li v-for="label in labels" v-bind:key="label.id">
        <input
          type="checkbox"
          v-bind:value="label.id"
          v-model="newTaskLabelIDs"
        />
        {{ label.text }}
      </li>
    </ul>

    <form v-on:submit.prevent="addLabel">
      <input type="text" v-model="newLabelText" placeholder="new label" />
    </form>

    <h2>label filter</h2>
    <ul>
      <li v-for="label in labels" v-bind:key="label.id">
        <input
          type="radio"
          v-bind:checked="label.id === filter"
          v-on:change="changeFilter(label.id)"
        />
        {{ label.text }}
      </li>
      <li>
        <input
          type="radio"
          v-bind:checked="filter === null"
          v-on:change="changeFilter(null)"
        />
        no filter
      </li>
    </ul>

    <h2>save and resotre</h2>
    <button type="button" v-on:click="save">save</button>
    <button type="button" v-on:click="restore">restore</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//import HelloWorld from "./components/HelloWorld.vue";

@Component({
  components: {
    //HelloWorld
  }
})
export default class App extends Vue {
  //data() {
  //  return {
  //    newTaskName: ""
  //  };
  //}
  newTaskName: string = "";
  newTaskLabelIDs: number[] = [];
  newLabelText: string = "";

  //computed:
  get tasks() {
    //return this.$store.state.tasks;
    return this.$store.getters.filteredTasks;
  }

  //computed:
  get labels() {
    return this.$store.state.labels;
  }

  get filter() {
    return this.$store.state.filter;
  }

  addTask() {
    this.$store.commit("addTask", {
      name: this.newTaskName,
      labelIDs: this.newTaskLabelIDs
    });
    this.newTaskName = "";
    this.newTaskLabelIDs = [];
  }

  toggleTaskStatus(task: any) {
    this.$store.commit("toggleTaskStatus", {
      id: task.id
    });
  }

  addLabel() {
    this.$store.commit("addLabel", {
      text: this.newLabelText
    });
    this.newLabelText = "";
  }

  getLabelText(this: any, id: number) {
    const label = this.labels.filter((x: any) => x.id === id)[0];
    return label ? label.text : "";
  }

  changeFilter(labelID: any) {
    this.$store.commit("changeFilter", {
      filter: labelID
    });
  }

  save() {
    this.$store.dispatch("save");
  }

  restore() {
    this.$store.dispatch("restore");
  }
}
</script>

<style></style>
