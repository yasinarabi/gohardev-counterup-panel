import React, { useEffect, useRef } from 'react';
import { Field, PanelProps, reduceField } from '@grafana/data';
import { getTheme } from '@grafana/ui'
import { SimpleOptions } from 'types';
import { CountUp } from 'countup.js';
import { css} from '@emotion/css'
import { DataSelectOptions } from './DataSelect';

interface Props extends PanelProps<SimpleOptions> {}

let previousData = 0;
const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
const persianNumerals = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
export const SimplePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  const theme = getTheme()
  let newValue = options.endNumber;
  if (options.end === "query"){
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
  
    const standardCalcs = reduceField({ field: myfield!, reducers: options.reducer })
    newValue = standardCalcs[options.reducer[0]]
  }
  const countUpRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (countUpRef.current) {
      const countUp = new CountUp(countUpRef.current, newValue, {
        startVal: previousData,
        duration: options.duration,
        decimalPlaces: options.decimalPlaces,
        suffix: options.suffix,
        prefix: options.prefix,
        numerals: options.numeral === "fa" ? persianNumerals : options.numeral == "ar" ? arabicNumerals : []
      });
    
      if (!countUp.error) {
        countUp.start();
        previousData = newValue;
      } else {
        console.error(countUp.error);
      }
    }
  }, [options.end]);

  return (
    <div className={
      css`
        width: ${width}px;
        height: ${height}px;
        overflow: auto;
      `
    }>
      <p className={
        css`
          text-align: center;
          position: relative;
          font-size: ${options.titleFontSize}px;
          color: ${theme.visualization.getColorByName(options.titleColor)};
          top: ${options.titleTop}px;
          `
      }>{options.text}</p>
      <p id="counter-total" className={
        css`
          text-align: center;
          position: relative;
          font-size: ${options.counterFontSize}px;
          color: ${theme.visualization.getColorByName(options.counterColor)};
          top: ${options.counterTop}px;
          `
      }><span ref={countUpRef} /></p>
      </div>
  ) 
};
