import { validationAddressSchema } from '@/validation/validationAddressSchema';
import { z } from 'zod';

export type AddressFormValues = z.infer<typeof validationAddressSchema>;

export type AddressItem = {
  id: number;
  userId: number;
  fullName: string;
  province: string;
  city: string;
  postalAddress: string;
  buildingNumber: number;
  unit: number | null;
  isDefault: boolean;
  postalCode: string;
  createdAt: string;
  updatedAt: string;
};

export type ProvincesType = { id: number; name: string };

export type CitiesType = { id: number; name: string; province: number };
