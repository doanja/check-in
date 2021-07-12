import { parseError } from '@/helper';
import { User } from '@prisma/client';
import { FormSignIn } from 'components';
import { useModal } from 'contexts/ModalContext';
import { useState } from 'react';
import { UserService } from 'services';

const signIn = () => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [userData, setUserData] = useState<User>();
  const { toggleModal, setTitle, setBody } = useModal();

  const signinUser = async (formValues: { phone: string }, e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const userService = new UserService();
      const res = await userService.checkInUser(formValues.phone);
      // set name and pts here for welcome message
      console.log('in try');
      setCheckedIn(true);
      setUserData(res.data.data);
    } catch (error) {
      const errorText = parseError(error);

      setTitle(error.name);
      setBody(errorText);
      toggleModal(true);
    }
  };

  return (
    <div className='page-container'>
      <div className='mx-auto z-10 mt-48 text-center'>
        <h1 className='text-white text-5xl font-semibold'>
          Welcome to Back. <span className='text-purple-300'>Please Check In.</span>
        </h1>
        <p className='text-blue-300 mt-2'>Check in and earn points that can be used torwards rewards</p>
      </div>
      <div className='max-w-xl w-full mt-24 mb-24 rounded-md shadow-2xl bg-white mx-auto overflow-hidden z-10'>
        <div className='px-16 py-10'>
          <FormSignIn onSubmit={signinUser} />
        </div>
      </div>
    </div>
  );
};

export default signIn;
