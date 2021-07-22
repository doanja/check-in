import { useForm } from 'react-hook-form';
import { FormError } from '@/components';
import { useEffect } from 'react';

type FormValues = {
  digit1: string;
  digit2: string;
  digit3: string;
  digit4: string;
};

interface FormProps {
  onSubmit: any;
  errorMsg: string;
}

const FormPin = ({ onSubmit, errorMsg }: FormProps) => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'all' });

  useEffect(() => {
    setFocus('digit1');
  }, [setFocus]);

  return (
    <>
      <form className='shadow-md rounded py-6 px-3 mb-3 bg-gray-200' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-row gap-1 justify-center '>
          <input
            className='form-input-pin'
            type='password'
            maxLength={1}
            size={1}
            {...register('digit1', {
              required: 'This is required',
            })}
          />

          <input
            className='form-input-pin'
            type='password'
            maxLength={1}
            size={1}
            {...register('digit2', {
              required: 'This is required',
            })}
          />
          <input
            className='form-input-pin'
            type='password'
            maxLength={1}
            size={1}
            {...register('digit3', {
              required: 'This is required',
            })}
          />
          <input
            className='form-input-pin'
            type='password'
            maxLength={1}
            size={1}
            {...register('digit4', {
              required: 'This is required',
            })}
          />
        </div>

        <div className='text-center'>
          {(errors.digit1 && <FormError errorMessage={errors.digit1.message} />) ||
            (errors.digit2 && <FormError errorMessage={errors.digit2.message} />) ||
            (errors.digit3 && <FormError errorMessage={errors.digit3.message} />) ||
            (errors.digit4 && <FormError errorMessage={errors.digit4.message} />) ||
            (errorMsg && <FormError errorMessage={errorMsg} />)}
        </div>

        <button type='submit' className='form-btn-primary mt-3'>
          SUBMIT
        </button>
      </form>
    </>
  );
};

export default FormPin;
