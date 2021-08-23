import { useForm } from 'react-hook-form';
import { FormInput, FormError, Spinner } from '@/components';

type FormValues = {
  name: string;
  phone?: string;
};

interface FormProps {
  onSubmit: any;
  isLoading: boolean;
}

const FormCheckIn = ({ onSubmit, isLoading }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      {/* name */}
      <FormInput textFor='name' labelText='name'>
        <input
          className='form-input'
          {...register('name', { required: 'This is required', maxLength: { value: 32, message: 'You exceeded the max length' } })}
          type='text'
          placeholder='Name'
        />
        {errors.name && <FormError errorMessage={errors.name.message} />}
      </FormInput>

      {/* phone */}
      <FormInput textFor='phone' labelText='phone (optional)'>
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
    </form>
  );
};

export default FormCheckIn;
