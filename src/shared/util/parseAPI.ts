import type { Product, RawProduct } from '@src/types/product';
import type { GroupName, ProductNames, RawGroupName } from '@src/types/names';

export const formatProductFieldName = (rawProduct: RawProduct): Product => {
  return {
    price: rawProduct.C,
    groupId: rawProduct.G,
    id: rawProduct.T,
    count: rawProduct.P,
  };
};

export const formatGroupNameFieldName = (
  rawGroupNames: RawGroupName
): GroupName => {
  const normalized: GroupName = {};

  Object.entries(rawGroupNames).forEach(([key, value]) => {
    const rawProducts = value.B;
    const normalizedProducts: ProductNames = {};

    Object.entries(rawProducts).forEach(([key, product]) => {
      normalizedProducts[key] = {
        name: product.N,
        id: product.T,
      };
    });

    normalized[key] = { name: value.G, products: normalizedProducts };
  });

  return normalized;
};

export const normalizeGroupNames = (groups: GroupName) => {
  const products = Object.values(groups).reduce((acc, curr) => {
    return { ...acc, ...curr.products };
  }, {});

  return { groupNames: groups, productNames: products };
};
