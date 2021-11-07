type TData = Record<string, any>;

export abstract class BaseTransformer {
  #data: Promise<TData> | Promise<TData>[];

  constructor(data: TData | TData[]) {
    if (Array.isArray(data)) {
      this.#data = data.map(this.transform);
    } else {
      this.#data = this.transform(data);
    }
  }

  abstract transform(data: TData): Promise<TData>;

  get data(): Promise<TData | TData[]> {
    if (Array.isArray(this.#data)) return Promise.all(this.#data);
    return this.#data;
  }
}
