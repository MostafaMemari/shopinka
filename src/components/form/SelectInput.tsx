import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Option {
  label: string;
  value: string;
}

interface SelectInputProps {
  id: string;
  name: string;
  label: string;
  formik: any;
  options: Option[];
  placeholder: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  onChange?: (selectedOption: Option | null) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({
  id,
  name,
  label,
  formik,
  options,
  placeholder,
  isDisabled = false,
  isRequired = false,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-700">
        {label}
        {isRequired && <span className="text-red-500"> *</span>}
      </label>
      <Select
        name={name}
        value={formik.values[name] ?? ''}
        onValueChange={(value) => {
          const selectedOption = options.find((opt) => opt.value === value) || null;
          formik.setFieldValue(name, value);
          if (onChange) onChange(selectedOption);
        }}
        onOpenChange={(open) => {
          if (!open) formik.setFieldTouched(name, true);
        }}
        disabled={isDisabled}
      >
        <SelectTrigger
          id={id}
          className={cn(
            'h-10 w-full rounded-md border border-gray-300',
            formik.touched[name] && formik.errors[name] && 'border-red-500',
            isDisabled && 'opacity-50 cursor-not-allowed',
            'text-right',
          )}
          dir="rtl"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {formik.touched[name] && formik.errors[name] && <p className="text-red-500 text-xs mt-1">{formik.errors[name]}</p>}
    </div>
  );
};

export default SelectInput;
