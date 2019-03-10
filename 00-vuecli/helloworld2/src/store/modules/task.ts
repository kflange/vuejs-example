import { Action, Module, Mutation, VuexModule, getModule } from 'vuex-module-decorators';
import store from '@/store/store';

export interface ITask {
  id: number;
  name: string;
  labelIDs: number[];
  done: boolean;
}

export interface ITaskList {
  tasks: ITask[];
}


@Module({dynamic: true, store, name: 'tasks', namespaced: true})
class Tasks extends VuexModule implements ITaskList {
  public tasks = [
     {
       id: 1,
       name: 'buy milk',
       labelIDs: [1, 2],
       done: false,
     },
     {
       id: 2,
       name: 'buy book',
       labelIDs: [1, 3],
       done: true,
     },
  ];

  @Mutation
  public toggleTaskStatus(id: number): void {
    const filteredTask = this.tasks.filter((task) => {
      if (task.id === id) {
        return task;
      }
    });

    filteredTask.forEach((task) => {
      task.done = !task.done;
    });
  }
}

export const taskModule = getModule(Tasks);
