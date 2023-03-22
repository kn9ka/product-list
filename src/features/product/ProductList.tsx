import type { Product } from '@src/types/product';
import { ProductItem } from './ProductItem';

type ProductListProps = {
  products: Product[];
};
export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const groups = products.map(({ groupId }) => groupId);
  const uniqueGroups = [...new Set(groups)];

  return (
    <div className="w-full flex flex-col gap-4">
      {uniqueGroups.map((id) => (
        <div key={id} className="p-4 rounded bg-stone-50">
          <div className="font-bold text-black border-b border-slate-200 w-full mb-4">
            {id}
          </div>
          <div className="ml-4 flex flex-col gap-2">
            {products
              .filter((product) => product.groupId === id)
              .map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
