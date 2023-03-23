import type { Product } from '@src/types/product';
import { formatProductFieldName } from '@shared/util/parseAPI';

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch('http://localhost:3000/products.json');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const json = await res.json();
  return json.products.map(formatProductFieldName);
};
