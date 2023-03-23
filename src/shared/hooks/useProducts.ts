import useSWR, { Fetcher } from 'swr';
import type { Product } from '@src/types/product';
import { formatProductFieldName } from '@shared/util/parseAPI';
import { useNamesDictionary } from './useNamesDictionary';
const REFRESH_INTERVAL = 20000;

const fetcher: Fetcher<Product[], string> = (...args) =>
  fetch(...args)
    .then((res) => res.json())
    .then((json) => json.products.map(formatProductFieldName));

export const useProducts = () => {
  const { data, error, isLoading } = useSWR(`/products.json`, fetcher, {
    refreshInterval: REFRESH_INTERVAL,
  });

  const { dictionary } = useNamesDictionary();

  const products = (data || []).map((product: Product) => {
    const { productNames = {}, groupNames = {} } = dictionary || {};

    const name = productNames[product.id]?.name;
    const groupName = groupNames[product.groupId]?.name;

    return { ...product, name, groupName };
  });

  return {
    products,
    isLoading,
    isError: error,
  };
};
