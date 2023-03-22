import { Currency } from '@enums/currency';
import { getRandomNumberBetween } from '@shared/util/numbers';

export const getCurrencyRate = (currency: Currency): number | undefined => {
  const currencyGetFunctions = {
    [Currency.USD]: () => getRandomNumberBetween(50, 80),
  };

  const getter = currencyGetFunctions[currency];

  if (!getter) {
    return;
  }
  return getter();
};
