export type RawGroupName = {
  [key: string]: {
    G: string;
    B: RawProductName;
  };
};

type RawProductName = {
  [key: string]: {
    N: string;
    T: number;
  };
};

export type GroupName = {
  [key: string]: {
    name: string;
    products: { [key: string]: ProductName };
  };
};

type ProductName = {
  name: string;
  id: number;
};
