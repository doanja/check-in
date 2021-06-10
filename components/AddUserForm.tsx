import { useForm } from 'react-hook-form';
import FormInput from './FormInput';

const FormError = ({ errorMessage }: { errorMessage: string }) => {
  return <p className='text-red-300 mt-1'>{errorMessage}</p>;
};

interface AddContactFormProps {
  onSubmit: any;
}

type FormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
};

// npm install @hookform/resolvers
// npm i yup

const AddContactForm = (props: AddContactFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();
  return (
    <form className='flex flex-col' onSubmit={handleSubmit(props.onSubmit)}>
      <div className='mb-3'>
        <FormInput placeholder='First Name' name='firstName' formRef={register('firstName')} />
        {errors.firstName && <FormError errorMessage='First Name is required' />}
      </div>
      <div className='mb-3'>
        <FormInput placeholder='Last Name' name='lastName' formRef={register('lastName')} />
        {errors.lastName && <FormError errorMessage='Last Name is required' />}
      </div>
      <div className='mb-3'>
        <FormInput placeholder='Email' name='email' formRef={register('email')} />
        {errors.email && <FormError errorMessage='Email is required' />}
      </div>
      <div className='mb-3'>
        <FormInput placeholder='Avatar' name='avatar' formRef={register('avatar')} />
        {errors.avatar && <FormError errorMessage='Avatar is required' />}
      </div>

      <button className='bg-blue-500 rounded-md p-4 text-blue-100' type='submit'>
        Submit
      </button>
    </form>
  );
};

export default AddContactForm;
