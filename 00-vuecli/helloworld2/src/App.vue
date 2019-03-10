<template>
  <div>
    <h2>task list</h2>
    <ul>
      <li v-for="task in tasks" v-bind:key="task.id">
        <input
          type="checkbox"
          v-bind:checked="task.done"
        />
        {{ task.name }}
      </li>
    </ul>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class App extends Vue {

  get tasks() {
    return this.$store.state.tasks;
  }

}
</script>

<style lang="stylus">
</style>
