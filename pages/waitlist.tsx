import { ModalPin, PageContainer, WaitlistTable } from '@/components';
import { useRouter } from 'next/router';
import { useState } from 'react';

export async function getStaticProps() {
  return {
    props: { SECRET_PIN: process.env.PIN }, // will be passed to the page component as props
  };
}

interface WaitlistProps {
  SECRET_PIN: string;
}

const waitlist = ({ SECRET_PIN }: WaitlistProps) => {
  const router = useRouter();
  const [allowEdits, setAllowEdits] = useState<boolean>(false);
  const [showModal, toggleModal] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState('');

  const editWaitlist = (formValues: { digit1: string; digit2: string; digit3: string; digit4: string }, e: React.SyntheticEvent) => {
    e.preventDefault();

    let enteredPin = '';

    for (const [key, value] of Object.entries(formValues)) {
      enteredPin += value;
    }

    // form on submit verify pin number & allow form to be updated
    if (enteredPin === SECRET_PIN) {
      setAllowEdits(true);
      toggleModal(false);
      setErrorMsg('');
    } else {
      setErrorMsg('Pin incorrect');
    }

    // render done button, after finished, then set allowEdits to false
  };

  return (
    <PageContainer
      headerLeft='Wait'
      headerRight='list'
      children={
        <>
          {allowEdits ? (
            <>
              <WaitlistTable allowEdits={allowEdits} />

              <button onClick={() => router.push('/')} type='button' className='form-btn-primary my-3 max-w-md mx-auto'>
                Home
              </button>

              <button onClick={() => toggleModal(true)} type='button' className='form-btn-secondary my-3 max-w-md mx-auto'>
                Edit Waitlist
              </button>
            </>
          ) : (
            <>
              <WaitlistTable allowEdits={allowEdits} />

              <button onClick={() => setAllowEdits(false)} type='button' className='form-btn-primary my-3 max-w-md mx-auto'>
                Done
              </button>
            </>
          )}

          <ModalPin
            showModal={showModal}
            toggleModal={toggleModal}
            title={'Enter Security Pin'}
            body={''}
            editWaitlist={editWaitlist}
            errorMsg={errorMsg}
          />
        </>
      }
    />
  );
};

export default waitlist;
