import { CurrencyRate } from '@features/currency';

export const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold underline">Привет техлид!</h1>
      <CurrencyRate />
    </div>
  );
};
