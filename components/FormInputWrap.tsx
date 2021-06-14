interface FormInputWrapProps {
  textFor: string;
  labelText: string;
  children: React.ReactNode;
}

const FormInput = ({ textFor, labelText, children }: FormInputWrapProps) => {
  return (
    <div className='mb-3'>
      <label className='block text-gray-200 text-sm font-bold mb-2' htmlFor={textFor}>
        {labelText}
      </label>

      {children}
    </div>
  );
};

export default FormInput;
