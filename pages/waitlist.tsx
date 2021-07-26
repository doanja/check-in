import { CheckInContainer, ModalPin, PageContainer, WaitlistTable } from '@/components';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMemory } from 'contexts/MemoryContext';

export async function getStaticProps() {
  return {
    props: { SECRET_PIN: process.env.PIN },
  };
}

interface WaitlistProps {
  SECRET_PIN: string;
}

const waitlist = ({ SECRET_PIN }: WaitlistProps) => {
  const router = useRouter();
  const [allowEdits, setAllowEdits] = useState<boolean>(false);
  const [showModal, toggleModal] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { setCheckedInUsers } = useMemory();

  const editWaitlist = (formValues: { pin: string }, e: React.SyntheticEvent) => {
    e.preventDefault();

    // form on submit verify pin number & allow form to be updated
    if (formValues.pin === SECRET_PIN) {
      setAllowEdits(true);
      toggleModal(false);
      setErrorMsg('');
    } else {
      setErrorMsg('Pin incorrect');
    }
  };

  const clearWaitlist = () => {
    setCheckedInUsers([]);
    setAllowEdits(false);
  };

  return (
    <PageContainer
      headerLeft='Wait'
      headerRight='list'
      children={
        <>
          <CheckInContainer />
          <WaitlistTable allowEdits={allowEdits} />

          {allowEdits ? (
            <div className='form-btn-group'>
              <button onClick={() => setAllowEdits(false)} type='button' className='form-btn-primary my-3 max-w-md mx-auto'>
                Done
              </button>

              <button onClick={clearWaitlist} type='button' className='form-btn-secondary my-3 max-w-md mx-auto'>
                Clear Waitlist
              </button>
            </div>
          ) : (
            <div className='form-btn-group'>
              <button onClick={() => router.push('/')} type='button' className='form-btn-primary my-3 max-w-md mx-auto'>
                Home
              </button>

              <button onClick={() => toggleModal(true)} type='button' className='form-btn-secondary my-3 max-w-md mx-auto'>
                Edit Waitlist
              </button>
            </div>
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
