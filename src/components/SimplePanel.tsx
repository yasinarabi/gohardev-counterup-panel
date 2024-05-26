import React, { useEffect, useRef } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { CountUp } from 'countup.js';
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

  return <span ref={countUpRef} />;
};
