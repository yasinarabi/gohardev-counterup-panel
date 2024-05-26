import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    .addNumberInput({
      path: 'start',
      name: 'Start',
      description: 'Description of panel option',
      defaultValue: 0,
    })
    .addNumberInput({
      path: 'end',
      name: 'End',
      description: 'Description of panel option',
      defaultValue: 100,
    })
    .addNumberInput({
      path: 'duration',
      name: 'Duration',
      description: 'Description of panel option',
      defaultValue: 500,
    })
    
});
