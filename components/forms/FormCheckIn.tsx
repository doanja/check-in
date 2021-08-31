import { useForm } from 'react-hook-form';
import { FormInput, FormError, Spinner } from '@/components';

type FormValues = {
  name: string;
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
          {...register('name', { required: 'Name is required', maxLength: { value: 32, message: 'You exceeded the max length' } })}
          type='text'
          placeholder='Name'
          autoComplete='off'
        />
        {errors.name && <FormError errorMessage={errors.name.message} />}
      </FormInput>

      <button type='submit' className='form-btn-primary my-3' disabled={isLoading}>
        <Spinner isLoading={isLoading} />
        Check In
      </button>
    </form>
  );
};

export default FormCheckIn;
