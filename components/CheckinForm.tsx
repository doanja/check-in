import { useForm } from 'react-hook-form';
import { FormInput, FormError } from 'components';

type FormValues = {
  name: string;
};

interface CheckinFormProps {
  onSubmit: any;
}

const CheckinForm = ({ onSubmit }: CheckinFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      <FormInput textFor='name' labelText='name'>
        <input
          className='form-input'
          {...register('name', { required: 'This is required', maxLength: { value: 32, message: 'You exceeded the max length' } })}
          type='text'
          placeholder='John'
        />
        {errors.name && <FormError errorMessage={errors.name.message} />}
      </FormInput>

      <button type='submit' className='form-btn-primary'>
        Check In
      </button>
    </form>
  );
};

export default CheckinForm;
