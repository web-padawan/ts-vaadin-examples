export type Address = {
  street: string;
  city: string;
};

export type User = {
  firstName: string;
  lastName: string;
  address: Address;
};

export type Status = {
  label: string;
  value: string;
};
