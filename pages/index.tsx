import { Modal } from '@/components';
import { useState } from 'react';

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <div>
      <h1 className='text-lg text-red-500' onClick={toggleModal}>
        Home
      </h1>
      <Modal showModal={showModal} toggleModal={toggleModal} title='test' body='this is a body' />
    </div>
  );
}
