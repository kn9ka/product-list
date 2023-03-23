import { useState } from 'react';

import {
  LS_CURRENT_RATE_NAME,
  LS_PREV_RATE_NAME,
  CURRENCY_GET_INTERVAL,
} from '@shared/util/config';
import { useInterval } from 'usehooks-ts';

const getRateByKey = (key: string) => {
  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : undefined;
};

// чтобы можно было в любой момент поменять логику получения курс
// например сделать правильно и фетчить данные с какого-нибудь апи
export const useCurrencyRate = () => {
  const [prevRate, setPrevRate] = useState(getRateByKey(LS_PREV_RATE_NAME));
  const [nextRate, setNextRate] = useState(getRateByKey(LS_CURRENT_RATE_NAME));

  useInterval(() => {
    setPrevRate(getRateByKey(LS_PREV_RATE_NAME));
    setNextRate(getRateByKey(LS_CURRENT_RATE_NAME));
  }, CURRENCY_GET_INTERVAL);

  console.log(prevRate, nextRate);

  return [nextRate, prevRate];
};
