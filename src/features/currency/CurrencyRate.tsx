'use client';
import { useCurrencyRate } from '@shared/hooks/useCurrencyRate';

export const CurrencyRate = () => {
  const [nextRate] = useCurrencyRate();

  return (
    <div>
      <span>текущий курс: </span>
      <span>{nextRate}</span>
    </div>
  );
};
