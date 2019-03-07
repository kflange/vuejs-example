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
      </li>
    </ul>

    <form v-on:submit.prevent="addTask">
      <input type="text" v-model="newTaskName" placeholder="new task" />
    </form>
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

  //computed:
  get tasks() {
    return this.$store.state.tasks;
  }

  addTask() {
    this.$store.commit("addTask", {
      name: this.newTaskName
    });
    this.newTaskName = "";
  }

  toggleTaskStatus(task: any) {
    this.$store.commit("toggleTaskStatus", {
      id: task.id
    });
  }
}
</script>

<style></style>
