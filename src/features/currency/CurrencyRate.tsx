'use client';
import { useCurrencyRate } from '@shared/hooks';

export const CurrencyRate = () => {
  const [rate] = useCurrencyRate();

  return (
    <div>
      <span>текущий курс: </span>
      <span>{rate}</span>
    </div>
  );
};
