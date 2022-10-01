declare interface Array<T> {
  distinct(predicate?: string | ((value: T) => string | number | boolean)): T[];

  distinctNotNull(predicate?: string | ((value: T) => string | number | boolean)): T[];

  filterNotNull(): T[];

  distinctBy(predicate: string | ((value: T) => string | number | boolean)): T[];

  first(): T;

  last(): T;
}

declare interface String {
  first(): string;

  last(): string;

  filter(predicate: ((value: string, index: number, str: string) => string | number | boolean)): string;

  find(predicate: ((value: string, index: number, str: string) => string | number | boolean)): string;

  findIndex(predicate: ((value: string, index: number, str: string) => string | number | boolean)): number;

  map(predicate: ((value: string, index: number, str: string) => string | number | boolean)): string;

  forEach(predicate: ((value: string, index: number, str: string) => void)): void;

  isLetter(): boolean;

  isNumber(): boolean;

  plus(charSequence: string): string;
}
