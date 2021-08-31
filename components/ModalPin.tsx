import { FormPin } from '@/components';
import { AiFillLock } from 'react-icons/ai';

interface ModalPinProps {
  toggleModal: ToggleModal;
  showModal: boolean;
  title: string;
  body: string;
  editWaitlist: any;
  errorMsg: string;
}

const ModalPin = ({ toggleModal, showModal, title, body, editWaitlist, errorMsg }: ModalPinProps) => {
  return showModal ? (
    <div className='min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover'>
      <div className='absolute bg-black opacity-80 inset-0 z-0' onClick={() => toggleModal(!showModal)}></div>
      <div className='w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-gray-800 border-1 border-red-500'>
        <div className='text-center content-center w-full'>
          <AiFillLock size='2rem' />

          <h2 className='text-xl font-bold py-4 capitalize'>{title}</h2>
          <p className='text-sm text-gray-500 px-8'>{body}</p>
        </div>

        {/* form */}
        <FormPin onSubmit={editWaitlist} errorMsg={errorMsg} />
      </div>
    </div>
  ) : null;
};

export default ModalPin;
