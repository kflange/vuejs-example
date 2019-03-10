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
          {{ getLabelText(id) }},
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
    // return taskModule.tasks;
    return taskModule.filteredTasks;
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

  get filter(): number {
    return taskModule.filteredNumber;
  }

  private addLabel() {
    labelModule.addLabel(this.newLabelText);
    this.newLabelText = '';
  }

  private getLabelText(id: number) {
    const label = labelModule.labels.filter((x: ILabel) => x.id === id)[0];
    return label ? label.text : '';
  }

  private changeFilter(filteredNumber: number) {
      taskModule.setFilter(filteredNumber);
  }
}
</script>


<style lang="stylus">
</style>
