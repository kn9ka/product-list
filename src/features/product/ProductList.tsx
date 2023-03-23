import type { Product } from '@src/types/product';
import { ProductItem } from '@shared/ui/Product/ProductItem';
import { useNamesDictionary } from '@/shared/hooks/useNamesDictionary';

type ProductListProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
};
export const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddToCart,
}) => {
  const { dictionary } = useNamesDictionary();
  const { groupNames = {} } = dictionary || {};

  const groups = (products || []).map(({ groupId }) => groupId);
  const uniqueGroups = [...new Set(groups)];

  return (
    <div className="w-4/6 flex flex-col gap-4">
      {uniqueGroups.map((id) => (
        <div key={id} className="p-4 rounded bg-stone-50">
          <div className="font-bold text-black border-b border-slate-200 w-full mb-4">
            {groupNames[id]?.name || ''}
          </div>
          <div className="ml-4 flex flex-col gap-2">
            {products
              .filter((product) => product.groupId === id)
              .map((product) => (
                <ProductItem
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
