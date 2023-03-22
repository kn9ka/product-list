import { useEffect, useState, useCallback } from 'react';
import { useInterval } from 'usehooks-ts';
import { getCurrencyRate } from '@shared/util/currency';
import { Currency } from '@enums/currency';

const CURRENCY_GET_INTERVAL = 10000;

export const useCurrencyRate = () => {
  const [nextRate, setNextRate] = useState<number | undefined>();
  const [prevRate, setPrevRate] = useState<number | undefined>();

  // да-да, можно было сделать вот так для ленивой инициализации: useState(getCurrencyRate(Currency.USD))
  // однако NextJS такое не любит, ругается что html отличается во время гидрации
  useEffect(() => {
    const next = getCurrencyRate(Currency.USD);
    const prev = nextRate;
    setNextRate(next);
    setPrevRate(prev);
  }, []);

  useInterval(() => {
    const currentRate = getCurrencyRate(Currency.USD);
    setNextRate(currentRate);
    setPrevRate(nextRate);
  }, CURRENCY_GET_INTERVAL);

  return [nextRate, prevRate];
};
