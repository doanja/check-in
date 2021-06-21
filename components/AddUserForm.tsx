import { useForm } from 'react-hook-form';
import { FormInput } from 'components';

interface AddContactFormProps {
  onSubmit: any;
}

const AddContactForm = (props: AddContactFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(props.onSubmit)}>
      <FormInput textFor='name' labelText='name'>
        <input
          className='rounded p-4 text-xl w-full'
          {...register('name', { required: 'This is required', maxLength: { value: 32, message: 'You exceeded the max length' } })}
          type='text'
          placeholder='John'
        />
        {errors.name && <FormError errorMessage={errors.name.message} />}
      </FormInput>

      <FormInput textFor='phone' labelText='phone'>
        <input
          className='rounded p-4 text-xl w-full'
          {...register('phone', {
            required: 'This is required',
            maxLength: { value: 10, message: 'You exceeded the max length' },
            pattern: { value: /[0-9]{10}/, message: 'Must be a valid phone number with area code' },
          })}
          type='tel'
          placeholder='1234567890'
        />
        {errors.phone && <FormError errorMessage={errors.phone.message} />}
      </FormInput>

      <FormInput textFor='email' labelText='email'>
        <input
          className='rounded p-4 text-xl w-full'
          {...register('email', {
            pattern: {
              value:
                /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
              message: 'Must be a valid email address',
            },
          })}
          type='email'
          placeholder='email@domain.com'
        />
        {errors.email && <FormError errorMessage={errors.email.message} />}
      </FormInput>

      <FormInput textFor='birthday' labelText='birthday'>
        <input className='rounded p-4 text-xl w-full' {...register('birthday')} type='date' />
      </FormInput>

      <button className='bg-blue-500 rounded-md p-4 text-blue-100' type='submit'>
        Submit
      </button>
    </form>
  );
};

export default AddContactForm;

type FormValues = {
  name: string;
  phone: string;
  email: string;
  birthday: string;
};

const FormError = ({ errorMessage }: { errorMessage: string | undefined }) => {
  return <p className='text-red-300 mt-1'>{errorMessage ? errorMessage : 'Error with input value'}</p>;
};
