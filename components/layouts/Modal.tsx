interface ModalProps {
  toggleModal: ToggleModal;
  showModal: boolean;
  title: string;
  body: string;
}

const Modal = ({ toggleModal, showModal, title, body }: ModalProps) => {
  return showModal ? (
    <div className='modal-bg'>
      <div className='modal-position' onClick={() => toggleModal(!showModal)}></div>
      <div className='modal'>
        <div className='modal-content'>
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

          <h2 className='modal-title'>{title}</h2>
          <p className='modal-body'>{body}</p>
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
