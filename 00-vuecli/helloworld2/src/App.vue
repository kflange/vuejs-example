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

  get tasks(): ITask[] {
    return taskModule.tasks;
  }

  public toggleTaskStatus(task: ITask): void {
    taskModule.toggleTaskStatus(task.id);
  }
}
</script>


<style lang="stylus">
</style>
