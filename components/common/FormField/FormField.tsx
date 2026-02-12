import { FormInput } from '@/components/common/FormInput/FormInput';

interface FormFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  placeholder,
  type = 'text',
}) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      {label && (
        <label
          htmlFor={name}
          className="text-[13px] font-bold text-white/95"
        >
          {label}
        </label>
      )}

      <FormInput
        name={name}
        type={type}
        placeholder={placeholder || label}
      />
    </div>
  );
};
