import React, { useState } from 'react';
import { Prisma } from '@prisma/client';
import { FormSignUp, PageContainer } from 'components';
import { getCurrentTimeStamp, parseError } from '@/helper';
import { useRouter } from 'next/router';
import { useModal } from '@/contexts/ModalContext';
import { useMemory } from '@/contexts/MemoryContext';
import { UserService } from 'services';

const signUp = () => {
  const router = useRouter();
  const { checkedInUsers, setCheckedInUsers } = useMemory();
  const { toggleModal, setTitle, setBody } = useModal();
  const [formStep, setFormStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const createUser = async (user: Prisma.UserCreateInput, e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userService = new UserService();
      const res = await userService.createUser(user);
      const res2 = await userService.checkInUser(res.data.data.phone);
      const newCheckedInUser: CheckedInUser = { name: res2.data.data.name, checkInTime: getCurrentTimeStamp() };
      await setCheckedInUsers([...checkedInUsers, newCheckedInUser]);

      // TODO: send text to customer with pts info

      router.push('/waitlist');
    } catch (error) {
      const errorText = parseError(error);
      if (errorText === 'Phone number already in use.') setFormStep(2);

      setTitle(error.name);
      setBody(errorText);
      toggleModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer
      headerLeft='Welcome to '
      headerRight='the Club'
      subHeader='Become a new member in 4 easy steps'
      children={<FormSignUp onSubmit={createUser} formStep={formStep} setFormStep={setFormStep} isLoading={isLoading} />}
    />
  );
};

export default signUp;
