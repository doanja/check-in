import { Spinner } from '@/components';

interface FormSignUpButtonsProps {
  formStep: number;
  prevStep: PrevStep;
  nextStep: NextStep;
  isValid: any;
  isLoading: boolean;
}

const FormSignUpButtons = ({ formStep, prevStep, nextStep, isValid, isLoading }: FormSignUpButtonsProps) => {
  return formStep === 1 ? (
    <div className='form-btn-group'>
      <button disabled={!isValid} onClick={nextStep} type='button' className='form-btn-primary'>
        Next
      </button>
    </div>
  ) : (
    <div className='form-btn-group'>
       <button onClick={prevStep} type='button' className='form-btn-secondary' disabled={isLoading}>
        Back
      </button>

       <button type='submit' className='form-btn-primary' disabled={isLoading}>
        <Spinner isLoading={isLoading} />
        {'Complete Signup'}
      </button>
    </div>
  );
};

export default FormSignUpButtons;
