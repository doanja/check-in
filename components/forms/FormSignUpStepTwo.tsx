import { FormInput, FormError } from 'components';

interface FormSignupStepTwoProps {
  register: any;
  errors: any;
}

const FormSignUpStepTwo = ({ register, errors }: FormSignupStepTwoProps) => {
  return (
    <>
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
          placeholder='Email address (optional)'
        />
        {errors.email && <FormError errorMessage={errors.email.message} />}
      </FormInput>

      <FormInput textFor='birthday' labelText='birthday (optional)'>
        <input className='form-input' {...register('birthday')} type='date' placeholder='Birthday' />
      </FormInput>
    </>
  );
};

export default FormSignUpStepTwo;
