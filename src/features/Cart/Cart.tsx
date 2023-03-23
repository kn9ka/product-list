import { useCurrencyRate } from '@/shared/hooks';
import { useProducts } from '@/shared/hooks/useProducts';
import { CartItem } from '@shared/ui/Cart';

type CardProps = {
  cart: {
    [x: string]: { count: number; id: number; name: string; price: number };
  };
  onCartChange: (id: number, opts: { count: number }) => void;
};

export const Cart: React.FC<CardProps> = ({ cart, onCartChange }) => {
  const { products } = useProducts();
  const [rate] = useCurrencyRate();
  const findProductById = (id: number) => products.find((p) => p.id === id);

  const handleCountChange =
    (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const count = Number(e.target.value);
      const availableCount = findProductById(id)?.count || 0;
      onCartChange(id, {
        count: count > availableCount ? availableCount : count,
      });
    };

  const totalPrice = Object.keys(cart).reduce((acc, key) => {
    const { price, count } = cart[key];
    return acc + price * count;
  }, 0);

  const isCartEmpty = Object.keys(cart).length === 0;

  return (
    <div className="w-2/6 h-max bg-white p-4 rounded">
      <div>
        {Object.values(cart).map(({ id: productId, count, name, price }) => (
          <CartItem
            key={productId}
            name={name}
            count={count}
            available={findProductById(productId)?.count}
            onCountChange={handleCountChange(productId)}
            price={(price * count * rate).toFixed(2)}
          />
        ))}
      </div>
      {!isCartEmpty && (
        <div className="mt-auto  flex justify-between items-center border-t-2 p-2">
          <span className="text-black">Total amount: </span>
          <span className="text-black">{totalPrice}</span>
        </div>
      )}
    </div>
  );
};
