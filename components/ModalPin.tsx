interface ModalPinProps {
  toggleModal: ToggleModal;
  showModal: boolean;
  title: string;
  body: string;
}

const ModalPin = ({ toggleModal, showModal, title, body }: ModalPinProps) => {
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
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
            />
          </svg>

          <h2 className='text-xl font-bold py-4 capitalize'>{title}</h2>
          <p className='text-sm text-gray-500 px-8'>{body}</p>
        </div>

        {/* form */}
        <form className='bg-blue-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-row gap-1 items-center'>
          <input className='form-input-pin' type='text' maxLength={1} size={1} />
          <input className='form-input-pin' type='text' maxLength={1} size={1} />
          <input className='form-input-pin' type='text' maxLength={1} size={1} />
          <input className='form-input-pin' type='text' maxLength={1} size={1} />
        </form>

        <div className='p-3 mt-2 text-center space-x-4 md:block'>
          <button className='form-btn-primary' onClick={() => toggleModal(!showModal)}>
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalPin;
