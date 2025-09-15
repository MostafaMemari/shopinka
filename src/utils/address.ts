import { AddressItem } from '@/features/address/AddressType';

export const formatFullAddress = (address: AddressItem) => {
  return [
    `استان ${address.province}`,
    `شهر ${address.city}`,
    address.postalAddress,
    address.buildingNumber ? `پلاک ${address.buildingNumber}` : null,
    address.unit ? `واحد ${address.unit}` : null,
  ]
    .filter(Boolean)
    .join('، ');
};
