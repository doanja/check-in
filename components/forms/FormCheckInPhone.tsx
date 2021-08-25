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

const FormCheckInPhone = ({ onSubmit, isLoading }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      {/* phone */}
      <FormInput textFor='phone' labelText='phone (returning customer)'>
        <input
          className='form-input'
          {...register('phone', {
            required: false,
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

      {<Link href='/signup'>Not a registered user? Sign-up here.</Link>}
    </form>
  );
};

export default FormCheckInPhone;
