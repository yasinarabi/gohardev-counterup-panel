type NonEmptyArray<T> = T[] & { 0: T };
type endValues = 'query' | 'number';
type numeralValues = 'en' | 'fa' | 'ar';

export interface SimpleOptions {
  // Data
  dataSelect: string;
  reducer: NonEmptyArray<string>;
  // Title
  text: string;
  titleFontSize: number;
  titleColor: string;
  titleTop: number;
  // Counter
  start: number;
  end: endValues;
  endNumber: number;
  duration: number;
  prefix: string;
  suffix: string;
  counterFontSize: number;
  counterColor: string;
  counterTop: number;
  decimalPlaces: number;
  numeral: numeralValues;
}
