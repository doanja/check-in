import { useModal } from 'contexts/ModalContext';

export default function Home() {
  const { toggleModal } = useModal();

  return (
    <div>
      <h1 className='text-lg text-red-500 cursor-pointer' onClick={() => toggleModal(true)}>
        Home
      </h1>
    </div>
  );
}
