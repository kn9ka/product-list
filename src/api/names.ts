import type { GroupName } from '@src/types/names';

export const fetchNames = async (): Promise<GroupName> => {
  const res = await fetch('http://localhost:3000/names.json');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const json = await res.json();
  return json;
};
