import { useField } from 'formik';


interface FormInputProps {
    name: string;
    type?: string;
    placeholder?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  type = 'text',
  ...props
}) => {
   const [field, meta] = useField(props);

  const hasError = meta.touched && meta.error;
  
  return (
    <div className="flex flex-col">
    <input
        {...field}
        {...props}
        type={type}
      
        className={`
        border w-full h-12 px-2 py-1 rounded-sm
        text-[rgba(255,255,255,0.95)]
        bg-transparent
        focus:outline-none focus:border-white
        ${hasError ? 'border-red-500' : 'border-[rgba(255,255,255,0.44)]'}
        `}
    />
    {hasError && (
        <div className="text-red-500 text-[13px] mt-2">
            
            {meta.error}
        </div>
    )}
    </div>
  );
};
