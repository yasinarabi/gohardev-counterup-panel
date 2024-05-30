import { StandardEditorProps, SelectableValue, DataFrame } from '@grafana/data';
import React from 'react';
import { Select } from '@grafana/ui';

export const DataSelectOptions = (data: DataFrame[]): SelectableValue<string>[] => {
  const options: SelectableValue<string>[] = [];

  if (data) {
    const queries = data;

    for (let i = 0; i < queries.length; i++) {
      const fields = queries[i].fields.filter((f) => f.type == "number")
      for (let j = 0; j < fields.length; j++) {
        options.push({
          label: queries[i].refId + ":" + fields[j].name,
          value: queries[i].refId + ":" + fields[j].name,
        });  
      }
      
    }
  }
  return options
}


export const DataSelect = ({ item, value, onChange, context }: StandardEditorProps<string>) => {
  const options = DataSelectOptions(context.data)
  return <Select options={options} value={value || options[0]} onChange={(selectableValue) => onChange(selectableValue.value)} />;
};