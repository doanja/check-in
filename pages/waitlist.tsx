import { ModalPin, PageContainer, WaitlistTable } from '@/components';
import { useRouter } from 'next/router';
import { useState } from 'react';

const waitlist = () => {
  const router = useRouter();
  const [allowEdits, setAllowEdits] = useState<boolean>(false);
  const [showModal, toggleModal] = useState<boolean>(true);

  const editWaitlist = () => {
    // render form for admin user to login (pin number)
    // form on submit verify pin number
    // allow form to be updated
    // render done button, after finished, then set allowEdits to false
  };

  return (
    <PageContainer
      headerLeft='Wait'
      headerRight='list'
      children={
        <>
          <WaitlistTable />

          <button onClick={() => router.push('/')} type='button' className='form-btn-primary my-3 max-w-md mx-auto'>
            Home
          </button>

          <button onClick={editWaitlist} type='button' className='form-btn-secondary my-3 max-w-md mx-auto'>
            Edit Waitlist
          </button>

          <ModalPin showModal={showModal} toggleModal={toggleModal} title={'Enter Security Pin'} body={''} />
        </>
      }
    />
  );
};

export default waitlist;
