import React, { useState } from 'react';
import { Prisma } from '@prisma/client';
import { FormSignUp } from 'components';
import { UserService } from 'services';
import { useModal } from '@/contexts/ModalContext';
import { getCurrentTimeStamp, parseError } from '@/helper';
import { useMemory } from '@/contexts/MemoryContext';
import { useRouter } from 'next/router';

const signUp = () => {
  const router = useRouter();
  const { checkedInUsers, setCheckedInUsers } = useMemory();
  const { toggleModal, setTitle, setBody } = useModal();
  const [formStep, setFormStep] = useState(1);

  const createUser = async (user: Prisma.UserCreateInput, e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const userService = new UserService();
      const res = await userService.createUser(user);
      console.log(`res.data`, res.data);

      const res2 = await userService.checkInUser(res.data.data.phone);
      console.log(`res2.data`, res2.data);

      const newCheckedInUser: CheckedInUser = { name: res2.data.user.name, checkInTime: getCurrentTimeStamp() };
      await setCheckedInUsers([...checkedInUsers, newCheckedInUser]);

      // router.push('/waitlist');
    } catch (error) {
      setTitle(error.name);

      const errorText = parseError(error);
      setBody(errorText);
      toggleModal(true);

      if (errorText === 'Phone number already in use.') setFormStep(2);
    }
  };

  return (
    <div className='page-container'>
      <div className='mx-auto z-10 mt-48 text-center'>
        <h1 className='text-white text-5xl font-semibold'>
          Welcome to <span className='text-purple-300'>the Club</span>
        </h1>
        <p className='text-blue-300 mt-2'>Become a new member in 5 easy steps</p>
      </div>

      <div className='max-w-xl w-full mt-24 mb-24 rounded-md shadow-2xl bg-white mx-auto overflow-hidden z-10'>
        <div className='px-16 py-10'>
          <FormSignUp onSubmit={createUser} formStep={formStep} setFormStep={setFormStep} />
        </div>
      </div>
    </div>
  );
};

export default signUp;
