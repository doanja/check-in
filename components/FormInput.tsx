interface FormInputProps {
  placeholder: string;
  name: string;
  formRef: any;
}

const FormInput = ({ placeholder, name, formRef }: FormInputProps) => {
  return <input className='rounded p-4 text-xl w-full' name={name} placeholder={placeholder} ref={formRef} />;
};

export default FormInput;
