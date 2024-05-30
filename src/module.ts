import { PanelPlugin, standardEditorsRegistry, ReducerID } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';
import { DataSelect } from './components/DataSelect';
export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addCustomEditor({
      id: 'dataSelect',
      path: 'dataSelect',
      name: 'Data Select',
      editor: DataSelect,
      category: ['Data'],
    })
    .addCustomEditor({
      id: 'reducer',
      path: 'reducer',
      name: 'Calculation',
      category: ['Data'],
      description: 'Choose a reducer function / calculation',
      editor: standardEditorsRegistry.get('stats-picker').editor,
      defaultValue: [ReducerID.last],
    })
    .addTextInput({
      path: 'title',
      name: 'Title',
      defaultValue: 'Title',
    })
    .addNumberInput({
      path: 'start',
      name: 'Start',
      defaultValue: 0,
    })
    .addNumberInput({
      path: 'end',
      name: 'End',
      defaultValue: 100,
    })
    .addNumberInput({
      path: 'duration',
      name: 'Duration',
      defaultValue: 500,
    })
    
});
