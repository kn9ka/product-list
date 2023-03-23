'use client';
import { useState, useEffect } from 'react';
import { ProductList } from '@features/product';
import { Cart } from '@features/cart';
import { useProducts } from '@shared/hooks';
import { Product } from '@src/types/product';

export const Shopping = () => {
  const { products } = useProducts();
  const [cart, setCart] = useState<{
    [x: string]: { count: number; id: number; name: string; price: number };
  }>({});

  const onAddToCart = (product: Product) => {
    const prevCount = cart[product.id]?.count || 0;
    const newCount = prevCount === product.count ? prevCount : prevCount + 1;

    setCart((prev) => ({
      ...prev,
      [product.id]: {
        id: product.id,
        name: product.name,
        price: product.price,
        count: newCount,
      },
    }));
  };

  const onCountChange = (id: number, { count }: { count: number }) => {
    const prevValue = cart[id];

    setCart((prev) => ({
      ...prev,
      [id]: { ...prevValue, count },
    }));

    setTimeout(() => {
      if (count === 0) {
        const newState = { ...cart };
        delete newState[id];

        setCart(newState);
        return;
      }
    }, 3000);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prevCart = window.localStorage.getItem('cart');
      const parsed = prevCart ? JSON.parse(prevCart) : {};
      if (parsed) {
        setCart(parsed);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="flex flex-row gap-8 py-8">
      <ProductList products={products} onAddToCart={onAddToCart} />
      <Cart cart={cart} onCartChange={onCountChange} />
    </div>
  );
};
