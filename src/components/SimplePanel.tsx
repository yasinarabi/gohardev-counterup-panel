import React, { useEffect, useRef } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { CountUp } from 'countup.js';
import { css} from '@emotion/css'
interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
 
  const countUpRef = useRef<HTMLSpanElement>(null);
  console.log(data.series[0].fields[0].values[0])

  useEffect(() => {
    if (countUpRef.current) {
      const countUp = new CountUp(countUpRef.current, options.end, {
        // startVal: options.start,
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
