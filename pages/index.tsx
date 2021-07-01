import { Modal } from '@/components';
import { useModal } from '@/contexts/ModalContext';

export default function Home() {
  const { showModal, toggleModal } = useModal();

  return (
    <div>
      <h1 className='text-lg text-red-500 cursor-pointer' onClick={() => toggleModal(true)}>
        Home
      </h1>
      <Modal toggleModal={toggleModal} showModal={showModal} title='error' body='This is some random message about the error' />
    </div>
  );
}
