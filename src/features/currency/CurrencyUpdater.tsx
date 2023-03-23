'use client';
import { getCurrencyRate } from '@/shared/util/currency';
import { useEffect } from 'react';
import { useInterval } from 'usehooks-ts';
import { Currency } from '@enums/currency';

import {
  LS_CURRENT_RATE_NAME,
  LS_PREV_RATE_NAME,
  CURRENCY_GET_INTERVAL,
} from '@shared/util/config';

// эту же штуку можно было решить через контекст или какое-нибудь хранилище данных
// но ввиду того, что мы уже кое где поюзали localstorage, решил не плодить логики
// могу, умею, могу сделать иначе, но не хочу.
export const CurrencyUpdater = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const rate = getCurrencyRate(Currency.USD);
      window.localStorage.setItem(LS_CURRENT_RATE_NAME, JSON.stringify(rate));
      window.localStorage.setItem(LS_PREV_RATE_NAME, JSON.stringify(rate));
    }
  }, []);

  useInterval(() => {
    const newRate = getCurrencyRate(Currency.USD);
    const prevRate = window.localStorage.getItem(LS_CURRENT_RATE_NAME);

    window.localStorage.setItem(LS_CURRENT_RATE_NAME, JSON.stringify(newRate));
    window.localStorage.setItem(
      LS_PREV_RATE_NAME,
      JSON.stringify(JSON.parse(prevRate || ''))
    );
  }, CURRENCY_GET_INTERVAL);

  return <></>;
};
