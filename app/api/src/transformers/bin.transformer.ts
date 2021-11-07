import { Bin } from '@prisma/client';
import { BaseTransformer } from '../core/base-transformer';

export class BinTransformer extends BaseTransformer {
  constructor(data: Bin | Bin[]) {
    super(data);
  }

  async transform(data: Bin): Promise<Record<string, any>> {
    return {
      id: data.uuid,
      title: data.title,
      body: data.body,
      visibility: data.visibility,
      lang: data.lang,
      slug: data.slug,
    };
  }
}
