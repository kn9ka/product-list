import type { Product } from '@src/types/product';

type CardProps = {
  products: Product[];
};
export const Cart: React.FC<CardProps> = ({ products }) => {
  return (
    <div className="w-1/3 bg-white p-4 rounded">
      <div></div>
      <div>
        <span>total</span>
      </div>
    </div>
  );
};
