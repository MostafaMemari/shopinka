'use client';

import { useEffect, useMemo, useState } from 'react';
import TextInput from '@/components/common/TextInput';
import SelectInput from '@/components/common/SelectInput';
import { AddressFormType } from '@/types/addressType';
import { provinces } from '@/data/provinces';
import { cities } from '@/data/cities';
import { useFormik } from 'formik';
import { validationAddressSchema } from '@/validation/validationAddressSchema';
import { useAddress } from '@/hooks/address/useAddress';
import PrimaryButton from '@/components/common/PrimaryButton';
import { cn } from '@/lib/utils';

interface AddressFormProps {
  initialValues?: AddressFormType & { id: number };
  className?: string;
  onSuccess?: () => void;
}

function AddressForm({ initialValues, className = '', onSuccess }: AddressFormProps) {
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(null);

  const { createAddress, updateAddress, isCreateAddressLoading, isUpdateAddressLoading } = useAddress({});

  const isLoadingSubmit = isCreateAddressLoading || isUpdateAddressLoading;

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
      if (initialValues) {
        updateAddress(initialValues.id, values, () => {
          formik.resetForm();
          setSelectedProvinceId(null);
          onSuccess?.();
        });
      } else {
        createAddress(values, () => {
          formik.resetForm();
          setSelectedProvinceId(null);
          onSuccess?.();
        });
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <form onSubmit={formik.handleSubmit} className={cn('space-y-1 text-right', className)} dir="rtl">
      <div className="grid grid-cols-1 gap-4">
        <TextInput id="fullName" name="fullName" isRequired label="نام و نام خانوادگی تحویل گیرنده" formik={formik} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SelectInput
          id="province"
          name="province"
          label="استان"
          formik={formik}
          options={provinces.map((p) => ({ value: p.name, label: p.name }))}
          placeholder="انتخاب کنید"
          isRequired
          onChange={(selected) => {
            const value = selected?.value || '';
            const provinceId = provinces.find((p) => p.name === value)?.id || null;
            setSelectedProvinceId(provinceId);
            formik.setFieldValue('province', value);
            formik.setFieldValue('city', '');
            formik.setFieldTouched('city', false);
          }}
        />
        <SelectInput
          key={`city-${selectedProvinceId}`}
          id="city"
          name="city"
          label="شهر"
          formik={formik}
          options={filteredCities.map((c) => ({ value: c.name, label: c.name }))}
          placeholder="انتخاب کنید"
          isRequired
          isDisabled={!selectedProvinceId}
          onChange={(selected) => {
            const value = selected?.value || '';
            formik.setFieldValue('city', value);
          }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextInput id="plate" name="plate" label="پلاک" isRequired formik={formik} />
        <TextInput id="streetAndAlley" name="streetAndAlley" isRequired label="خیابان و کوچه" formik={formik} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextInput id="unit" name="unit" label="واحد" formik={formik} />
        <TextInput id="postalCode" name="postalCode" label="کدپستی" formik={formik} isRequired />
      </div>

      <PrimaryButton isLoading={isLoadingSubmit} className="w-full mt-6" type="submit">
        {initialValues ? 'ویرایش' : 'ثبت'} آدرس
      </PrimaryButton>
    </form>
  );
}

AddressForm.displayName = 'AddressForm';

export default AddressForm;
