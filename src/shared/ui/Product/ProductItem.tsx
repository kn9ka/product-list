import { useEffect, useRef } from 'react';
import type { Product } from '@src/types/product';
import { useCurrencyRate } from '@shared/hooks';
import styles from './styles.module.scss';
import cn from 'classnames';

type ProductItemProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

export const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onAddToCart,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [nextRate, prevRate] = useCurrencyRate();

  const increase = () => {
    ref?.current?.classList.add(styles.increase);
  };
  const decrease = () => {
    ref?.current?.classList.add(styles.decrease);
  };
  const clear = () => {
    ref?.current?.classList.remove(styles.decrease, styles.increase);
  };

  useEffect(() => {
    if (nextRate && prevRate) {
      if (nextRate > prevRate) increase();
      if (nextRate < prevRate) decrease();
    }
  }, [nextRate, prevRate]);

  const handleAddToCart = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onAddToCart(product);
  };

  const price = (product.price * nextRate).toFixed(2);

  return (
    <div
      ref={ref}
      className={cn(
        'items-center p-2 text-black rounded-lg border-slate-200 border bg-stone-100 gap-2',
        styles.grid
      )}
      onAnimationEnd={clear}
    >
      <span>{product.name}</span>
      <div className="flex flex-col">
        <span className="text-slate-500 font-thin">price: </span>
        <span className="text-sm">{price}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-slate-500 font-thin">count: </span>
        <span className="text-sm">{product.count}</span>
      </div>

      <button
        className="ml-2 px-2 border rounded bg-emerald-100 text-slate-600"
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
    </div>
  );
};
