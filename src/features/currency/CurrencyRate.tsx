'use client';
import { useCurrencyRate } from '@shared/hooks/useCurrencyRate';

export const CurrencyRate = () => {
  const [rate] = useCurrencyRate();

  return (
    <div>
      <span>текущий курс: </span>
      <span>{rate}</span>
    </div>
  );
};
