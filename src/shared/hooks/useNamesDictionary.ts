import useSWR, { Fetcher } from 'swr';
import type { GroupName, ProductNames } from '@src/types/names';
import {
  formatGroupNameFieldName,
  normalizeGroupNames,
} from '@shared/util/parseAPI';

const REFRESH_INTERVAL = 20000;

const fetcher: Fetcher<
  { groupNames: GroupName; productNames: ProductNames },
  string
> = (...args) =>
  fetch(...args)
    .then((res) => res.json())
    .then(formatGroupNameFieldName)
    .then(normalizeGroupNames);

export const useNamesDictionary = () => {
  const { data, error, isLoading } = useSWR(`/names.json`, fetcher, {
    refreshInterval: REFRESH_INTERVAL,
  });

  return {
    dictionary: data,
    isLoading,
    isError: error,
  };
};
