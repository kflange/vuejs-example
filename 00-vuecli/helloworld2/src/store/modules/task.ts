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
  nextTaskID: number;
  filteredNumber: number;
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

  public nextTaskID = 3;
  public filteredNumber = 0;

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

  @Mutation
  public addTask(name: string, labelIDs: number[] ) {
    this.tasks.push({
      id: this.nextTaskID,
      name,
      labelIDs,
      done: false,
    });
    this.nextTaskID++;
  }

  @Mutation
  public setFilter(labelID: number) {
    this.filteredNumber = labelID;
  }

  get filteredTasks() {
    if (!this.filteredNumber) {
      return this.tasks;
    }
    return taskModule.tasks.filter((task: ITask) => {
      return task.labelIDs.indexOf(taskModule.filteredNumber) >= 0;
    });
  }
}

export const taskModule = getModule(Tasks);
