import { useForm } from 'react-hook-form';
import { FormSignUpStepOne, FormSignUpStepTwo, FormSignUpButtons } from '@/components';
import Link from 'next/link';

type FormValues = {
  name: string;
  phone: string;
  email: string;
  birthday: string;
};

interface FormProps {
  onSubmit: any;
  formStep: number;
  setFormStep: (step: number) => void;
  isLoading: boolean;
}

const FormSignUp = ({ onSubmit, formStep, setFormStep, isLoading }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: 'all' });

  const nextStep = () => setFormStep(formStep + 1);
  const prevStep = () => setFormStep(formStep - 1);
  const MAX_STEPS = 2;

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      {formStep <= MAX_STEPS && (
        <p className='text-sm text-gray-400 mb-2'>
          Step {formStep} of {MAX_STEPS}
        </p>
      )}

      {formStep === 1 ? <FormSignUpStepOne register={register} errors={errors} /> : <FormSignUpStepTwo register={register} errors={errors} />}

      <FormSignUpButtons formStep={formStep} prevStep={prevStep} nextStep={nextStep} isValid={isValid} isLoading={isLoading} />

      {<Link href='/signin'>Already a member? Check-In here.</Link>}
    </form>
  );
};

export default FormSignUp;
