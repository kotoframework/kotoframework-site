
export function defineProperties() {
  if (!Array.prototype.distinct) {
    Object.defineProperty(Array.prototype, 'distinct', {
      value: function <T>(predicate?: string | ((value: T) => string | number | boolean)): T[] {
        return Array.from(
          this
            .reduce((map: any, value: any) => {
              const key = predicate
                ? typeof predicate === 'string'
                  ? value[predicate]
                  : predicate!(value)
                : value;
              if (!map.has(key)) {
                map.set(key, value);
              }
              return map;
            }, new Map<string | number | boolean, T>())
            .values(),
        );
      },
    });
  }

  if (!Array.prototype.distinctNotNull) { //将item!==null改为!!item，以便排除null和undefined、空字符串，0的情况暂时不考虑
    Object.defineProperty(Array.prototype, 'distinctNotNull', {
      value: function <T>(predicate?: string | ((value: T) => string | number | boolean)): T[] {
        return this.distinct(predicate).filter((item: T) => !!item);
      },
    });
  }

  if (!Array.prototype.filterNotNull) {
    Object.defineProperty(Array.prototype, 'filterNotNull', {
      value: function <T>(): T[] {
        return this.filter((item: T) => !!item);
      },
    });
  }

  if (!Array.prototype.first) {
    Object.defineProperty(Array.prototype, 'first', {
      value: function <T>(): T {
        return this[0];
      },
    });
  }

  if (!Array.prototype.last) {
    Object.defineProperty(Array.prototype, 'last', {
      value: function <T>(): T {
        return this[this.length - 1];
      },
    });
  }

  if (!Array.prototype.distinctBy) {
    Object.defineProperty(Array.prototype, 'distinctBy', {
      value: function <T>(predicate?: string | ((value: T) => string | number | boolean)): T[] {
        return Array.from(
          this
            .reduce((map: any, value: any) => {
              const key = predicate
                ? typeof predicate === 'string'
                  ? value[predicate]
                  : predicate!(value)
                : value;
              if (!map.has(key)) {
                map.set(key, value);
              }
              return map;
            }, new Map<string | number | boolean, T>())
            .values(),
        );
      },
    });
  }

  if (!String.prototype.first) {
    Object.defineProperty(String.prototype, 'first', {
      value: function () {
        return this[0];
      },
    });
  }

  if (!String.prototype.last) {
    Object.defineProperty(String.prototype, 'last', {
      value: function () {
        return this[this.length - 1];
      },
    });
  }

  if (!String.prototype.filter) {
    Object.defineProperty(String.prototype, 'filter', {
      value: function (predicate: (value: string, index: number, str: string) => string | number | boolean) {
        return [...this].filter((value, index, arr) => predicate(value, index, arr.join(''))).join('');
      },
    });
  }

  if (!String.prototype.find) {
    Object.defineProperty(String.prototype, 'find', {
      value: function (predicate: (value: string, index: number, str: string) => string | number | boolean) {
        return [...this].find((value, index, arr) => predicate(value, index, arr.join('')));
      },
    });
  }

  if (!String.prototype.findIndex) {
    Object.defineProperty(String.prototype, 'findIndex', {
      value: function (predicate: (value: string, index: number, str: string) => string | number | boolean) {
        return [...this].findIndex((value, index, arr) => predicate(value, index, arr.join('')));
      },
    });
  }

  if (!String.prototype.map) {
    Object.defineProperty(String.prototype, 'map', {
      value: function (predicate: (value: string, index: number, str: string) => string | number | boolean) {
        return [...this].map((value, index, arr) => predicate(value, index, arr.join(''))).join('');
      },
    });
  }

  if (!String.prototype.forEach) {
    Object.defineProperty(String.prototype, 'forEach', {
      value: function (predicate: ((value: string, index: number, str: string) => void)) {
        return [...this].forEach((value, index, arr) => {
          predicate(value, index, arr.join(''));
        });
      },
    });
  }

  if (!String.prototype.isLetter) {
    Object.defineProperty(String.prototype, 'isLetter', {
      value: function () {
        return /^[a-zA-Z]+$/.test(this);
      },
    });
  }

  if (!String.prototype.isNumber) {
    Object.defineProperty(String.prototype, 'isNumber', {
      value: function () {
        return /^[0-9]+$/.test(this);
      },
    });
  }

  if (!String.prototype.plus) {
    Object.defineProperty(String.prototype, 'plus', {
      value: function (charSequence: string) {
        return this + charSequence;
      },
    });
  }
}
