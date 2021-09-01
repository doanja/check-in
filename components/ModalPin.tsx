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
    <div className='modal-bg'>
      <div className='modal-position' onClick={() => toggleModal(!showModal)}></div>
      <div className='modal'>
        <div className='modal-content'>
          <AiFillLock size='2rem' />

          <h2 className='modal-title'>{title}</h2>
          <p className='modal-body'>{body}</p>
        </div>

        {/* form */}
        <FormPin onSubmit={editWaitlist} errorMsg={errorMsg} />
      </div>
    </div>
  ) : null;
};

export default ModalPin;
