type CartItemProps = {
  name: string;
  count: number;
  available?: number;
  price: string | number;
  onCountChange: (e: React.ChangeEvent<HTMLInputElement>) => any;
};
export const CartItem: React.FC<CartItemProps> = ({
  name,
  count,
  available,
  price,
  onCountChange,
}) => {
  return (
    <div className="flex flex-col gap-4 mb-4">
      <span className="font-thin truncate text-black">{name}</span>
      <div className="p-2 flex items-center justify-between border rounded border-slate-500">
        <div className="flex items-center text-black">
          <span>count:&nbsp;</span>
          <input
            className="bg-white w-full border border-slate-300 rounded-md p-2 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            type="number"
            value={count}
            min={0}
            max={available || 0}
            onChange={onCountChange}
          />
        </div>
        <span className="text-black">price: {price}</span>
      </div>
    </div>
  );
};
