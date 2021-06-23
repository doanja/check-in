import { useForm } from 'react-hook-form';
import { FormInput, FormError } from 'components';
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

  const [formStep, setFormStep] = useState(1);
  const nextStep = () => setFormStep(formStep + 1);
  const MAX_STEPS = 5;

  const renderFormNavBtn = () => {
    if (formStep > 4) {
      return undefined;
    } else {
      return (
        <div className='flex flex-row gap-4 mt-3'>
          {formStep === 3 || formStep === 4 ? (
            <button disabled={!isValid} onClick={nextStep} type='button' className='form-btn-white'>
              Skip
            </button>
          ) : null}

          <button disabled={!isValid} onClick={nextStep} type='button' className='form-btn-blue'>
            Next
          </button>
        </div>
      );
    }
  };

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      {formStep < MAX_STEPS && (
        <p className='text-sm text-gray-400 mb-2'>
          Step {formStep} of {MAX_STEPS}
        </p>
      )}
      {formStep === 1 && (
        <FormInput textFor='name' labelText='name'>
          <input
            className='form-input'
            {...register('name', { required: 'This is required', maxLength: { value: 32, message: 'You exceeded the max length' } })}
            type='text'
            placeholder='John'
          />
          {errors.name && <FormError errorMessage={errors.name.message} />}
        </FormInput>
      )}

      {formStep === 2 && (
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
      )}

      {formStep === 3 && (
        <FormInput textFor='email' labelText='email'>
          <input
            className='form-input'
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

      {formStep === 4 && (
        <FormInput textFor='birthday' labelText='birthday'>
          <input className='form-input' {...register('birthday')} type='date' />
        </FormInput>
      )}

      {formStep === 5 && (
        <button type='submit' className='form-btn-blue'>
          {'Complete Signup & Check In'}
        </button>
      )}

      {renderFormNavBtn()}
    </form>
  );
};

export default SignupForm;
