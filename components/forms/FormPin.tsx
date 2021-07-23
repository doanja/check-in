import { useForm } from 'react-hook-form';
import { FormError } from '@/components';

type FormValues = {
  pin: string;
};

interface FormProps {
  onSubmit: any;
  errorMsg: string;
}

const FormPin = ({ onSubmit, errorMsg }: FormProps) => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormValues>({ mode: 'all' });

  return (
    <>
      <form className='shadow-md rounded py-6 px-3 mb-3 bg-gray-200' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-row gap-1 justify-center '>
          <input
            className='form-input text-center'
            type='password'
            maxLength={4}
            size={1}
            {...register('pin', {
              required: 'This is required',
            })}
          />
        </div>

        <div className='text-center'>
          {(errors.pin && <FormError errorMessage={errors.pin.message} />) || (errorMsg && <FormError errorMessage={errorMsg} />)}
        </div>

        <button type='submit' className='form-btn-primary mt-3'>
          SUBMIT
        </button>
      </form>
    </>
  );
};

export default FormPin;
