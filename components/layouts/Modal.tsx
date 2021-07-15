interface ModalProps {
  toggleModal: ToggleModal;
  showModal: boolean;
  title: string;
  body: string;
}

const Modal = ({ toggleModal, showModal, title, body }: ModalProps) => {
  return showModal ? (
    <div className='min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover'>
      <div className='absolute bg-black opacity-80 inset-0 z-0' onClick={() => toggleModal(!showModal)}></div>
      <div className='w-full max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white'>
        <div className='text-center p-5 flex-auto justify-center'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-16 h-16 flex items-center mx-auto'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
            />
          </svg>

          <h2 className='text-xl font-bold py-4 capitalize'>{title}</h2>
          <p className='text-sm text-gray-500 px-8'>{body}</p>
        </div>

        <div className='p-3 mt-2 text-center space-x-4 md:block'>
          <button className='form-btn-primary' onClick={() => toggleModal(!showModal)}>
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
