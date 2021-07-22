import { FormPin } from '@/components';

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
      <div className='w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white'>
        <div className='text-center mb-3 flex-auto justify-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-16 h-16 flex items-center mx-auto'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
            />
          </svg>

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
