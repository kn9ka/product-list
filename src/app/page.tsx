import { ProductList } from '@features/product';
import { Cart } from '@features/cart';
import type { Product } from '@src/types/product';
import type { Names } from '@src/types/names';
import { normalizeProduct } from '@shared/util/parseAPI';
import { CurrencyRate } from '@features/currency';

const getProducts = async (): Promise<Product[]> => {
  const res = await fetch('http://localhost:3000/products.json');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const json = await res.json();
  return json.products.map(normalizeProduct);
};

const getNames = async (): Promise<Names> => {
  const res = await fetch('http://localhost:3000/names.json');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const json = await res.json();
  return json;
};

export default async function MainPage() {
  const [products, productGroups] = await Promise.all([
    getProducts(),
    getNames(),
  ]);

  const normalizeGroups = () => {
    const groups: {
      ids: number[];
      entities: { [key: string]: any };
    } = {
      ids: [],
      entities: {},
    };

    Object.entries(productGroups).forEach(([key, value]) => {
      const numericKey = Number(key);
      if (!groups.ids.includes(numericKey)) {
        groups.ids.push(numericKey);
        groups.entities[key] = value;
      }
    });
    return groups;
  };

  const normalizeProducts = () => {
    const normalized: {
      ids: number[];
      entities: { [key: string]: any };
    } = {
      ids: [],
      entities: {},
    };

    products.forEach((product) => {
      const { T: id } = product;

      const numericKey = Number(id);
      if (!normalized.ids.includes(numericKey)) {
        normalized.ids.push(numericKey);
        normalized.entities[numericKey] = product;
      }
    });

    return normalized;
  };

  return (
    <main className="container mx-auto py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold underline">Привет техлид!</h1>
        <CurrencyRate />
      </div>
      <div className="flex flex-row gap-8 py-8">
        <ProductList products={products} groups={productGroups} />
        <Cart />
      </div>
    </main>
  );
}
