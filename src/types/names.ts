export type RawGroupName = {
  [key: string]: {
    G: string;
    B: RawProductNames;
  };
};

export type RawProductNames = {
  [key: string]: {
    N: string;
    T: number;
  };
};

export type GroupName = {
  [key: string]: {
    name: string;
    products: ProductNames;
  };
};

export type ProductNames = {
  [x: string]: {
    name: string;
    id: number;
  };
};
