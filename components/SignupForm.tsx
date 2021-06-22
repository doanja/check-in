import { useForm } from 'react-hook-form';
import { FormInput } from 'components';
import { useState } from 'react';

type FormValues = {
  name: string;
  phone: string;
  email: string;
  birthday: string;
};

interface SignupFormProps {
  onSubmit: any;
}

const SignupForm = ({ onSubmit }: SignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: 'all' });

  const [formStep, setFormStep] = useState(0);

  const nextStep = () => setFormStep(formStep + 1);

  const resetStep = () => setFormStep(0);

  const renderNextButton = () => {
    if (formStep > 3) {
      return undefined;
    } else {
      return (
        <div className='flex flex-row gap-4 mt-3'>
          {formStep === 2 || formStep === 3 ? (
            <button
              disabled={!isValid}
              onClick={nextStep}
              type='button'
              className='bg-white rounded p-4 w-full disabled:opacity-50 disabled:cursor-not-allowed'>
              Skip
            </button>
          ) : null}

          <button
            disabled={!isValid}
            onClick={nextStep}
            type='button'
            className='bg-blue-600 rounded p-4 w-full disabled:opacity-50 disabled:cursor-not-allowed'>
            Next
          </button>
        </div>
      );
    }
  };

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      {formStep === 0 && (
        <FormInput textFor='name' labelText='name'>
          <input
            className='rounded p-4 text-xl w-full'
            {...register('name', { required: 'This is required', maxLength: { value: 32, message: 'You exceeded the max length' } })}
            type='text'
            placeholder='John'
          />
          {errors.name && <FormError errorMessage={errors.name.message} />}
        </FormInput>
      )}

      {formStep === 1 && (
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
      )}

      {formStep === 2 && (
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
      )}

      {formStep === 3 && (
        <FormInput textFor='birthday' labelText='birthday'>
          <input className='rounded p-4 text-xl w-full' {...register('birthday')} type='date' />
        </FormInput>
      )}

      {/* replace this with a redirect to points page */}
      {formStep === 4 && (
        <div className='mb-3'>
          <h2 className='text-white font-semibold text-3xl mb-8'>Signup</h2>
          <button type='submit' className='mt-6 bg-blue-600 rounded p-4 w-full disabled:opacity-50 disabled:cursor-not-allowed'>
            Complete Signup
          </button>
        </div>
      )}

      {renderNextButton()}

      <button className='bg-red-500 rounded-md p-4 text-blue-100' type='button' onClick={resetStep}>
        Reset
      </button>
    </form>
  );
};

export default SignupForm;

const FormError = ({ errorMessage }: { errorMessage: string | undefined }) => {
  return <p className='text-red-300 mt-1'>{errorMessage ? errorMessage : 'Error with input value'}</p>;
};
