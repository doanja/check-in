import { useForm } from 'react-hook-form';
import { FormInput, FormError } from 'components';
import Link from 'next/link';

type FormValues = {
  phone: string;
};

interface CheckinFormProps {
  onSubmit: any;
}

const CheckinForm = ({ onSubmit }: CheckinFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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
          placeholder='### ### ####'
        />
        {errors.phone && <FormError errorMessage={errors.phone.message} />}
      </FormInput>

      <button type='submit' className='form-btn-primary'>
        Check In
      </button>

      <Link href='/signup'>Not a member? Signup here.</Link>
    </form>
  );
};

export default CheckinForm;
