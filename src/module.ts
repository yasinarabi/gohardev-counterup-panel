import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
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
