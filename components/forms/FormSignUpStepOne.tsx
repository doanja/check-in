import { FormInput, FormError } from '@/components';

interface FormSignInStepOneProps {
  register: any;
  errors: any;
}

const FormSignUpStepOne = ({ register, errors }: FormSignInStepOneProps) => {
  return (
    <>
      <FormInput textFor='name' labelText='name'>
        <input
          className='form-input'
          {...register('name', { required: 'Name is required', maxLength: { value: 32, message: 'You exceeded the max length' } })}
          type='text'
          placeholder='Name'
          minLength={1}
          maxLength={32}
        />
        {errors.name && <FormError errorMessage={errors.name.message} />}
      </FormInput>

      <FormInput textFor='phone' labelText='phone'>
        <input
          className='form-input'
          {...register('phone', {
            required: 'Phone is required',
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
    </>
  );
};

export default FormSignUpStepOne;
