import type { Product, RawProduct } from '@src/types/product';
import type { GroupName, RawGroupName } from '@src/types/names';

export const normalizeProduct = (rawProduct: RawProduct): Product => {
  return {
    price: rawProduct.C,
    groupId: rawProduct.G,
    id: rawProduct.T,
    count: rawProduct.P,
  };
};
