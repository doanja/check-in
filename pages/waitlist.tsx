import { ModalPin, PageContainer, WaitlistTable } from '@/components';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMemory } from '@/contexts';

const waitlist = () => {
  const router = useRouter();
  const [allowEdits, setAllowEdits] = useState<boolean>(false);
  const [showModal, toggleModal] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { checkedInUsers, setCheckedInUsers } = useMemory();

  const editWaitlist = (formValues: { pin: string }, e: React.SyntheticEvent) => {
    e.preventDefault();

    // form on submit verify pin number & allow form to be updated
    if (formValues.pin === process.env.NEXT_PUBLIC_SECRET_PIN) {
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

  const renderedContent = (
    <>
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
            Check In
          </button>
          <button onClick={() => toggleModal(true)} type='button' className='form-btn-secondary my-3 max-w-md mx-auto'>
            Edit
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
  );

  return <PageContainer title='waitlist' children={renderedContent} />;
};

export default waitlist;
