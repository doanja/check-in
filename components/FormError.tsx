interface FormErrorProps {
  errorMessage: string | undefined;
}

const FormError = ({ errorMessage }: FormErrorProps) => {
  return <p className='text-red-300 mt-1 font-lg font-semibold italic'>{errorMessage ? errorMessage : 'Error with input value'}</p>;
};

export default FormError;
