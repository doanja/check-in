import { useForm } from 'react-hook-form';
import { FormInput, FormError, Spinner } from '@/components';
import Link from 'next/link';

type FormValues = {
  phone: string;
};

interface FormProps {
  onSubmit: any;
  isLoading: boolean;
}

const FormSignIn = ({ onSubmit, isLoading }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      <FormInput textFor='phone' labelText='phone'>
        <input
          className='form-input'
          {...register('phone', {
            required: 'This is required',
            maxLength: { value: 10, message: 'You exceeded the max length' },
            pattern: { value: /[0-9]{10}/, message: 'Must be a valid phone number with area code' },
          })}
          type='tel'
          placeholder='Phone number'
          minLength={9}
          maxLength={10}
        />
        {errors.phone && <FormError errorMessage={errors.phone.message} />}
      </FormInput>

      <button type='submit' className='form-btn-primary my-3' disabled={isLoading}>
        <Spinner isLoading={isLoading} />
        Check In
      </button>

      <Link href='/signup'>Not a member? Signup here.</Link>
    </form>
  );
};

export default FormSignIn;
