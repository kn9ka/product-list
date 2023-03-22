'use client';
import { useState, useEffect, useRef } from 'react';
import type { Product } from '@types/product';
import { useCurrencyRate } from '@shared/hooks/useCurrencyRate';
import styles from './styles.module.scss';
import cn from 'classnames';

enum Status {
  Increase,
  Decrease,
}
type ProductItemProps = {
  product: Product;
};

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [nextRate, prevRate] = useCurrencyRate();
  const [status, setState] = useState<Status | undefined>();

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

  return (
    <div
      ref={ref}
      className={cn(
        'grid grid-cols-4 p-2 text-black rounded-lg border-slate-200 border bg-stone-100 '
      )}
      onAnimationEnd={clear}
    >
      <span>{product.id}</span>
      <span>{product.price * (nextRate || 0)}</span>
      <div className="">
        <span className="text-slate-500 font-thin">count: </span>
        <span>{product.count}</span>
      </div>
      <button className="ml-auto px-2 border rounded bg-emerald-100 text-slate-600">
        Add to cart
      </button>
    </div>
  );
};
