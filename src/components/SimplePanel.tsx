import React, { useEffect, useRef } from 'react';
import { Field, PanelProps, Vector, reduceField } from '@grafana/data';
import { SimpleOptions } from 'types';
import { CountUp } from 'countup.js';
import { css} from '@emotion/css'
import { DataSelectOptions } from './DataSelect';

interface Props extends PanelProps<SimpleOptions> {}

let previousData = 0;
export const SimplePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  let myfield: Field<any, any[]>;
  if (typeof(options.dataSelect) !== "undefined"){
    const queryRefId = options.dataSelect.split(":") [0]
    const fieldName = options.dataSelect.split(":") [1]
    const filteredQueries = data.series.filter((q) => q.refId === queryRefId)
    if (filteredQueries.length > 0){
      const query = filteredQueries[0]
      const filteredFields = query.fields.filter((f) => f.name === fieldName)
      if (filteredFields.length > 0){
        myfield = filteredFields[0]
      }
    }
  } else {
    const options = DataSelectOptions(data.series)
    if (options.length > 0){
      const queryRefId = options[0].value?.split(":") [0]
      const fieldName = options[0].value?.split(":") [1]
      const query = data.series.filter((q) => q.refId === queryRefId)[0]
      const filteredFields = query.fields.filter((f) => f.name === fieldName)
      myfield = filteredFields[0]
    }
  }
  const countUpRef = useRef<HTMLSpanElement>(null);

  const standardCalcs = reduceField({ field: myfield!, reducers: options.reducer })
  const newValue = standardCalcs[options.reducer[0]]
  useEffect(() => {
    if (countUpRef.current) {
      const countUp = new CountUp(countUpRef.current, newValue, {
        startVal: previousData,
        // duration: options.duration,
        // delay: options.delay,
        // suffix: options.suffix,
        // prefix: options.prefix,
      });
    
      if (!countUp.error) {
        countUp.start();
      } else {
        console.error(countUp.error);
      }
    }
  }, [options.end]);

  return (
    <div className={
      css`.counter-item {
        width: 45%;
        height: 100%;
        border-radius: 2px;
        border: #333 solid 1px; 
        background: #181b1f99;
        padding: 10px 5px;
      }`
    }>
      <h3 className={
        css`
          color: white;
          height: 60px;
          text-align: center;
          line-height: 1.6;
          `
      }>{options.title}</h3>
      <p id="counter-total" className={
        css`  color: #17ef8a;
          height: 80px;
          text-align: center;
          font-size: 4em;`
      }><span ref={countUpRef} /></p>
      </div>
  ) 
};
