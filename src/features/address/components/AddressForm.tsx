'use client';

import { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddressFormValues, AddressItem } from '@/features/address/types';
import { provinces } from '@/data/provinces';
import { cities } from '@/data/cities';
import { useAddress } from '@/features/address/hooks';
import { cn } from '@/lib/utils';
import { validationAddressSchema } from '@/validation/validationAddressSchema';
import Select from '@/components/common/Select';

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
    buildingNumber: initialValues?.buildingNumber ?? 0,
    unit: initialValues?.unit ?? null,
    postalCode: initialValues?.postalCode ?? '',
  };

  const form = useForm<AddressFormValues>({
    // @ts-ignore
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

  const onSubmit: SubmitHandler<any> = (values: AddressItem) => {
    const payload = {
      ...values,
      buildingNumber: Number(values.buildingNumber),
      unit: values.unit !== null ? Number(values.unit) : null,
    } as AddressFormValues;

    if (initialValues?.id) {
      updateAddress(initialValues.id, payload, () => {
        form.reset();
        setSelectedProvinceId(null);
        onSuccess?.();
      });
    } else {
      createAddress(payload, () => {
        form.reset();
        setSelectedProvinceId(null);
        onSuccess?.();
      });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} ref={ref} className={cn('space-y-4 text-right', className)} dir="rtl">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">نام تحویل گیرنده</Label>
          <Input {...form.register('fullName')} id="fullName" />
          {form.formState.errors.fullName && <p className="text-red-500 text-sm">{form.formState.errors.fullName.message}</p>}
        </div>

        <div>
          <Label htmlFor="postalCode">کدپستی</Label>
          <Input {...form.register('postalCode')} id="postalCode" />
          {form.formState.errors.postalCode && <p className="text-red-500 text-sm">{form.formState.errors.postalCode.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="province">استان</Label>

          <Select
            options={provinces}
            value={form.watch('province')}
            onValueChange={(value) => {
              const provinceId = provinces.find((p) => p.name === value)?.id || null;
              setSelectedProvinceId(provinceId);
              form.setValue('province', value);
              form.setValue('city', '');
            }}
            placeholder="استان را انتخاب کنید"
            className="my-2"
          />

          {form.formState.errors.province && <p className="text-red-500 text-sm">{form.formState.errors.province.message}</p>}
        </div>

        <div>
          <Label htmlFor="city">شهر</Label>

          <Select
            options={filteredCities}
            value={form.watch('city')}
            onValueChange={(value) => form.setValue('city', value)}
            placeholder="شهر را انتخاب کنید"
            className="my-2"
            disabled={!selectedProvinceId}
          />

          {form.formState.errors.city && <p className="text-red-500 text-sm">{form.formState.errors.city.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="buildingNumber">پلاک</Label>
          <Input type="number" {...form.register('buildingNumber', { valueAsNumber: true })} id="buildingNumber" />
          {form.formState.errors.buildingNumber && <p className="text-red-500 text-sm">{form.formState.errors.buildingNumber.message}</p>}
        </div>

        <div>
          <Label htmlFor="unit">واحد</Label>
          <Input type="number" {...form.register('unit', { valueAsNumber: true })} id="unit" />
          {form.formState.errors.unit && <p className="text-red-500 text-sm">{form.formState.errors.unit.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="postalAddress">آدرس پستی</Label>
        <Textarea {...form.register('postalAddress')} id="postalAddress" />
        {form.formState.errors.postalAddress && <p className="text-red-500 text-sm">{form.formState.errors.postalAddress.message}</p>}
      </div>
    </form>
  );
}
