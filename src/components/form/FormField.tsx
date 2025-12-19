import Select from '@/components/form/Select';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Control } from 'react-hook-form';

interface BaseFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  className?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  autoFocus?: boolean;
}

export function FormInput({
  control,
  name,
  label,
  className,
  onChange,
  onFocus,
  autoFocus = false,
  type = 'text',
}: BaseFieldProps & { type?: string }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel htmlFor={name}>{label}</FormLabel>

          <FormControl>
            <Input
              {...field}
              id={name}
              type={type}
              autoFocus={autoFocus}
              value={field.value ?? ''}
              onFocus={() => {
                onFocus?.();
              }}
              onChange={(e) => {
                field.onChange(e);
                onChange?.(e.target.value);
              }}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Textarea Field
export function FormTextarea({ control, name, label, className }: BaseFieldProps & { rows?: number }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea {...field} id={name} rows={3} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Select Field
interface FormSelectProps extends BaseFieldProps {
  options: { id: string | number; name: string }[];
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

export function FormSelect({ control, name, label, options, placeholder, disabled, onChange, className }: FormSelectProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                onChange?.(value);
              }}
              options={options}
              placeholder={placeholder}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
