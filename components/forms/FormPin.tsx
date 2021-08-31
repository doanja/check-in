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
      <form className='shadow-md rounded-md py-6 px-3 mb-3' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-row gap-1 justify-center test'>
          <input
            className='form-input text-center form-pin'
            type='text'
            maxLength={4}
            size={1}
            autoComplete='off'
            {...register('pin', {
              required: 'Pin is required',
            })}
          />
        </div>

        <div className='text-left'>
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
