import { PanelPlugin, standardEditorsRegistry, ReducerID } from '@grafana/data';
import { SimpleOptions } from './types';
import { SimplePanel } from './components/SimplePanel';
import { DataSelect } from './components/DataSelect';
export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions((builder) => {
  return builder
    // Title
    .addTextInput({
      path: 'text',
      name: 'Text',
      defaultValue: 'Title',
      category: ['Title'],
    })
    .addNumberInput({
      path: 'titleFontSize',
      name: 'Font Size',
      defaultValue: 16,
      category: ['Title'],
    })
    .addNumberInput({
      path: 'titleTop',
      name: 'Distance To Top ',
      defaultValue: 0,
      category: ['Title'],
    })
    .addColorPicker({
      path: 'titleColor',
      name: 'Text Color',
      defaultValue: 'text',
      category: ['Title'],
    })
    // Counter
    .addNumberInput({
      path: 'start',
      name: 'Start Number',
      defaultValue: 0,
      category: ['Counter'],
    })
    .addRadio({
      path: 'end',
      defaultValue: 'query',
      name: 'End',
      category: ['Counter'],
      settings: {
        options: [
          {
            value: 'query',
            label: 'Query Data',
          },
          {
            value: 'number',
            label: 'Number',
          }
        ],
      },
    })
    .addCustomEditor({
      id: 'dataSelect',
      path: 'dataSelect',
      name: 'Data Select',
      editor: DataSelect,
      category: ['Counter'],
      showIf: (config) => config.end === 'query'
    })
    .addCustomEditor({
      id: 'reducer',
      path: 'reducer',
      name: 'Calculation',
      category: ['Counter'],
      description: 'Choose a reducer function / calculation',
      editor: standardEditorsRegistry.get('stats-picker').editor,
      defaultValue: [ReducerID.last],
      showIf: (config) => config.end === 'query'
    })
    .addNumberInput({
      path: 'endNumber',
      name: 'End Number',
      defaultValue: 100,
      category: ['Counter'],
      showIf: (config) => config.end === 'number'
    })
    .addNumberInput({
      path: 'duration',
      name: 'Duration',
      defaultValue: 2,
      category: ['Counter'],
    })
    .addNumberInput({
      path: 'decimalPlaces',
      name: 'Decimal Places',
      defaultValue: 0,
      category: ['Counter'],
    })
    .addTextInput({
      path: 'prefix',
      name: 'Prefix',
      defaultValue: '',
      category: ['Counter'],
    })
    .addTextInput({
      path: 'suffix',
      name: 'Suffix',
      defaultValue: '',
      category: ['Counter'],
    })
    .addNumberInput({
      path: 'counterFontSize',
      name: 'Font Size',
      defaultValue: 48,
      category: ['Counter'],
    })
    .addNumberInput({
      path: 'counterTop',
      name: 'Distance To Top ',
      defaultValue: -20,
      category: ['Counter'],
    })
    .addColorPicker({
      path: 'counterColor',
      name: 'Text Color',
      defaultValue: 'green',
      category: ['Counter'],
    })
    .addRadio({
      path: 'numeral',
      defaultValue: 'en',
      name: 'Numeral',
      category: ['Counter'],
      settings: {
        options: [
          {
            value: 'en',
            label: 'English',
          },
          {
            value: 'fa',
            label: 'Persian',
          },
          {
            value: 'ar',
            label: 'Arabic',
          }
        ],
      },
    })
});
