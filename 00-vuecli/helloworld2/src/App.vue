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
import { Component, Vue } from 'vue-property-decorator';
import { ITask, taskModule } from '@/store/modules/task';
import store from '@/store/store';

@Component({
  components: {
  },
})
export default class App extends Vue {

  private newTaskName: string = '';
  private newLablelIDs: number[] = [];

  get tasks(): ITask[] {
    return taskModule.tasks;
  }

  private toggleTaskStatus(task: ITask): void {
    taskModule.toggleTaskStatus(task.id);
  }

  private addTask() {
    taskModule.addTask(this.newTaskName, this.newLablelIDs);
  }
}
</script>


<style lang="stylus">
</style>
