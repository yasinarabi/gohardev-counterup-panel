type NonEmptyArray<T> = T[] & { 0: T };

export interface SimpleOptions {
  // Data
  dataSelect: string;
  reducer: NonEmptyArray<string>;
  // Base Settings
  title: string;
  start: number;
  end: number;
  duration: number;

}
