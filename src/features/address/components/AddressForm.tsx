'use client';

import { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { AddressFormValues, AddressItem } from '@/features/address/types';
import { provinces } from '@/data/provinces';
import { cities } from '@/data/cities';
import { useAddress } from '@/features/address/hooks';
import { cn } from '@/lib/utils';
import { validationAddressSchema } from '@/validation/validationAddressSchema';
import { FormInput, FormSelect, FormTextarea } from '@/components/form/FormField';
import { Form } from '@/components/ui/form';

interface AddressFormProps {
  initialValues?: AddressItem;
  className?: string;
  onSuccess?: () => void;
  ref?: React.Ref<HTMLFormElement>;
  onLoadingChange?: (isLoading: boolean) => void;
}

export default function AddressForm({ initialValues, className = '', onSuccess, ref, onLoadingChange }: AddressFormProps) {
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(null);
  const { createAddress, updateAddress, isCreateAddressLoading, isUpdateAddressLoading } = useAddress({});
  const isLoadingSubmit = isCreateAddressLoading || isUpdateAddressLoading;

  const filteredCities = useMemo(() => {
    if (selectedProvinceId === null) return [];
    return cities.filter((city) => city.province === selectedProvinceId);
  }, [selectedProvinceId]);

  const defaultValues: AddressFormValues = {
    fullName: initialValues?.fullName ?? '',
    province: initialValues?.province ?? '',
    city: initialValues?.city ?? '',
    postalAddress: initialValues?.postalAddress ?? '',
    buildingNumber: initialValues?.buildingNumber.toString() ?? '',
    unit: initialValues?.unit?.toString() ?? '',
    postalCode: initialValues?.postalCode ?? '',
  };

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(validationAddressSchema),
    defaultValues,
    mode: 'onBlur',
  });

  useEffect(() => {
    if (initialValues?.province) {
      const provinceId = provinces.find((p) => p.name === initialValues.province)?.id || null;
      setSelectedProvinceId(provinceId);
    }
  }, [initialValues?.province]);

  useEffect(() => {
    onLoadingChange?.(isLoadingSubmit);
  }, [isLoadingSubmit]);

  const onSubmit: SubmitHandler<any> = (values: AddressFormValues) => {
    if (initialValues?.id) {
      updateAddress(initialValues.id, values, () => {
        form.reset();
        setSelectedProvinceId(null);
        onSuccess?.();
      });
    } else {
      createAddress(values, () => {
        form.reset();
        setSelectedProvinceId(null);
        onSuccess?.();
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} ref={ref} className={cn('space-y-4 text-right', className)} dir="rtl">
        <div className="grid grid-cols-2 gap-4">
          <FormInput control={form.control} name="fullName" label="نام تحویل گیرنده" />
          <FormInput control={form.control} name="postalCode" label="کدپستی" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormSelect
            control={form.control}
            name="province"
            label="استان"
            options={provinces}
            placeholder="استان را انتخاب کنید"
            onChange={(value) => {
              const provinceId = provinces.find((p) => p.name === value)?.id || null;
              setSelectedProvinceId(provinceId);
              form.setValue('province', value);
              form.setValue('city', '');
            }}
          />

          <FormSelect
            control={form.control}
            name="city"
            label="شهر"
            options={filteredCities}
            placeholder="شهر را انتخاب کنید"
            disabled={!selectedProvinceId}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput control={form.control} name="buildingNumber" label="پلاک" />
          <FormInput control={form.control} name="unit" label="واحد" />
        </div>

        <FormTextarea control={form.control} name="postalAddress" label="آدرس پستی" />
      </form>
    </Form>
  );
}
