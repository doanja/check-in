interface FormInputWrapProps {
  textFor: string;
  labelText: string;
  children: React.ReactNode;
}

const FormInput = ({ textFor, labelText, children }: FormInputWrapProps) => {
  return (
    <div className='mb-3'>
      <label className='form-input-wrap' htmlFor={textFor}>
        {labelText}
      </label>

      {children}
    </div>
  );
};

export default FormInput;
