interface FormInputProps {
  placeholder: string;
  name: string;
  formRef: any;
}

const FormInput = ({ placeholder, name, formRef }: FormInputProps) => {
  return (
    <>
      <label className='block text-gray-200 text-sm font-bold mb-2' htmlFor={name}>
        {placeholder}
      </label>
      <input className='rounded p-4 text-xl w-full' name={name} placeholder={placeholder} id={name} ref={formRef} />
    </>
  );
};

export default FormInput;
