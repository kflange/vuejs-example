import { Action, Module, Mutation, VuexModule, getModule } from 'vuex-module-decorators';
import store from '@/store/store';


export interface ILabel {
  id: number;
  text: string;
}

export interface ILabelList {
  labels: ILabel[];
  nextLabelID: number;
}


@Module({dynamic: true, store, name: 'labels', namespaced: true})
class Labels extends VuexModule implements ILabelList {
  public labels = [
    {
      id: 1,
      text: 'buy',
    },
    {
      id: 2,
      text: 'food',
    },
    {
      id: 3,
      text: 'book',
    },
  ];

  public nextLabelID = 4;

  @Mutation
  public addLabel(label: string) {
    this.labels.push({
      id: this.nextLabelID,
      text: label,
    });
    this.nextLabelID++;
  }
}

export const labelModule = getModule(Labels);
