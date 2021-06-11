import { useForm } from 'react-hook-form';
import FormInput from './FormInput';

const FormError = ({ errorMessage }: { errorMessage: string }) => {
  return <p className='text-red-300 mt-1'>{errorMessage}</p>;
};

interface AddContactFormProps {
  onSubmit: any;
}

type FormInputs = {
  name: string;
  phoneNumber: string;
  email: string;
  birthday: string;
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
        <FormInput placeholder='name' name='name' formRef={register('name')} />
        {errors.name && <FormError errorMessage='Name is required' />}
      </div>
      <div className='mb-3'>
        <FormInput placeholder='phone number' name='phoneNumber' formRef={register('phoneNumber')} />
        {errors.phoneNumber && <FormError errorMessage='Phone number is required' />}
      </div>
      <div className='mb-3'>
        <FormInput placeholder='email' name='email' formRef={register('email')} />
        {errors.email && <FormError errorMessage='Email is required' />}
      </div>
      <div className='mb-3'>
        <FormInput placeholder='birthday' name='birthday' formRef={register('birthday')} />
        {errors.birthday && <FormError errorMessage='Birthday is required' />}
      </div>

      <button className='bg-blue-500 rounded-md p-4 text-blue-100' type='submit'>
        Submit
      </button>
    </form>
  );
};

export default AddContactForm;
