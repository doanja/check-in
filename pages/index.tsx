import { Modal } from '@/components';
import { useModal } from '@/contexts/ModalContext';

export default function Home() {
  const { showModal, toggleModal, title, body } = useModal();

  return (
    <div>
      <h1 className='text-lg text-red-500 cursor-pointer' onClick={() => toggleModal(true)}>
        Home
      </h1>
      <Modal toggleModal={toggleModal} showModal={showModal} title={title} body={body} />
    </div>
  );
}
