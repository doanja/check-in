import { FiAlertCircle } from 'react-icons/fi';

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
          <FiAlertCircle size='3rem' />

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
