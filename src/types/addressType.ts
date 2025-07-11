export type AddressFormType = {
  fullName: string;
  province: string;
  city: string;
  plate: string;
  streetAndAlley: string;
  unit: string | null;
  postalCode: string | null;
};

export type AddressItem = {
  id: number;
  userId: number;
  province: string;
  city: string;
  plate: string;
  postalCode: string;
  fullName: string;
  streetAndAlley: string;
  unit: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ProvincesType = { id: number; name: string };

export type CitiesType = { id: number; name: string; province: number };
