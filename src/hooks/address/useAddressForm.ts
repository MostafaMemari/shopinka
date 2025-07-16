import { useFormik } from 'formik';
import { AddressFormType } from '@/types/addressType';
import { useEffect, useMemo, useState } from 'react';
import { cities } from '@/data/cities';
import { provinces } from '@/data/provinces';
import { validationAddressSchema } from '@/validation/validationAddressSchema';

interface UseAddressFormProps {
  onSubmit: (values: AddressFormType) => Promise<void>;
  initialValues?: AddressFormType;
}

export const useAddressForm = ({ onSubmit, initialValues }: UseAddressFormProps) => {
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(null);

  useEffect(() => {
    if (initialValues?.province) {
      const provinceId = provinces.find((p) => p.name === initialValues.province)?.id || null;
      setSelectedProvinceId(provinceId);
    }
  }, [initialValues?.province]);

  const filteredCities = useMemo(() => {
    if (selectedProvinceId === null) return [];
    return cities.filter((city) => city.province === selectedProvinceId);
  }, [selectedProvinceId]);

  const formik = useFormik({
    initialValues: initialValues ?? {
      fullName: '',
      province: '',
      city: '',
      plate: '',
      unit: '',
      postalCode: '',
      streetAndAlley: '',
    },
    validationSchema: validationAddressSchema,
    onSubmit: async (values) => {
      await onSubmit(values);
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  return {
    formik,
    selectedProvinceId,
    setSelectedProvinceId,
    filteredCities,
  };
};
