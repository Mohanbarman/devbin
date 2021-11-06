export abstract class BaseTransformer {
  data: Record<string, any>;

  constructor(data: Record<string, any> | Record<string, any>[]) {
    if (Array.isArray(data)) {
      this.data = data.map(this.transform);
    } else {
      this.data = this.transform(data);
    }
  }

  abstract transform(data: Record<string, any>): Record<string, any>;
}
