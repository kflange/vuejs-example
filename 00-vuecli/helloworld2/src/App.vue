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

  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ITask, taskModule } from '@/store/modules/task';
import { ILabel, labelModule } from '@/store/modules/label';
import store from '@/store/store';

@Component({
  components: {
  },
})
export default class App extends Vue {

  private newTaskName: string = '';
  private newTaskLabelIDs: number[] = [];
  private newLabelText: string = '';

  get tasks(): ITask[] {
    return taskModule.tasks;
  }

  private toggleTaskStatus(task: ITask): void {
    taskModule.toggleTaskStatus(task.id);
  }

  private addTask() {
    taskModule.addTask(this.newTaskName, this.newTaskLabelIDs);
    this.newTaskName = '';
    this.newTaskLabelIDs = [];
  }

  get labels(): ILabel[] {
    return labelModule.labels;
  }

  private addLabel() {
    labelModule.addLabel(this.newLabelText);
    this.newLabelText = '';

  }
}
</script>


<style lang="stylus">
</style>
