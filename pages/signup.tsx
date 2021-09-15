import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Prisma } from '@prisma/client';
import { FormSignUp, PageContainer } from '@/components';
import { getCurrentTimeStamp, parseError } from '@/helper';
import { useModal, useMemory } from '@/contexts';
import { UserService } from '@/services';
import { v4 as uuidv4 } from 'uuid';

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
      const newCheckedInUser: CheckedInUser = { id: uuidv4(), name: res2.data.data.name, checkInTime: getCurrentTimeStamp(), isCheckedIn: false };
      await setCheckedInUsers([...checkedInUsers, newCheckedInUser]);

      router.push('/waitlist');
    } catch (error: any) {
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
      title='Signup'
      children={<FormSignUp onSubmit={createUser} formStep={formStep} setFormStep={setFormStep} isLoading={isLoading} />}
    />
  );
};

export default signUp;
