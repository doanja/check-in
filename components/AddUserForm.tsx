import { useForm } from 'react-hook-form';
import FormInput from './FormInputWrap';

const FormError = ({ errorMessage }: { errorMessage: string }) => {
  return <p className='text-red-300 mt-1'>{errorMessage}</p>;
};

interface AddContactFormProps {
  onSubmit: any;
}

type FormInputs = {
  name: string;
  phone: string;
  email: string;
  birthday: string;
};

// todo add validation

const AddContactForm = (props: AddContactFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(props.onSubmit)}>
      <FormInput textFor={'name'} labelText={'name'}>
        <input className='rounded p-4 text-xl w-full' {...register('name')} placeholder='name' type='text' />
        {errors.name && <FormError errorMessage='Name is required' />}
      </FormInput>

      <FormInput textFor={'phone'} labelText={'phone'}>
        <input className='rounded p-4 text-xl w-full' {...register('phone')} placeholder='phone' type='tel' />
        {errors.phone && <FormError errorMessage='Phone number is required' />}
      </FormInput>

      <FormInput textFor={'email'} labelText={'email'}>
        <input className='rounded p-4 text-xl w-full' {...register('email')} placeholder='email' type='email' />
        {errors.email && <FormError errorMessage='Email is required' />}
      </FormInput>

      <FormInput textFor={'birthday'} labelText={'birthday'}>
        <input className='rounded p-4 text-xl w-full' {...register('birthday')} placeholder='birthday' type='date' />
        {errors.birthday && <FormError errorMessage='Birthday is required' />}
      </FormInput>

      <button className='bg-blue-500 rounded-md p-4 text-blue-100' type='submit'>
        Submit
      </button>
    </form>
  );
};

export default AddContactForm;
