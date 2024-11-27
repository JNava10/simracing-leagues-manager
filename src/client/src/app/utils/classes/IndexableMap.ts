export class IndexableMap<V> extends Map<number, V> {
  constructor() {
    super();
  }

  push = (item: V) => {
    this.set(this.size, item);
  };

  findIndex = (fn: (value: V, key: number) => boolean): number => {

    // Recordar que fn es la condición con la que se buscará el item.
    for (const [key, value] of this.entries()) {
      if (fn(value, key)) return key;
    }

    return -1;
  };

  static fromArray<V>(array: V[]): IndexableMap<V> {
    const map = new IndexableMap<V>();

    array.forEach((item, index) => map.set(index, item));

    return map;
  }
}
