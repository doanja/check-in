import { FormSignIn, PageContainer } from '@/components';
import { getCurrentTimeStamp, parseError } from '@/helper';
import { useRouter } from 'next/router';
import { useModal } from '@/contexts/ModalContext';
import { useMemory } from '@/contexts/MemoryContext';
import { UserService } from 'services';
import { useState } from 'react';

const signIn = () => {
  const router = useRouter();
  const { checkedInUsers, setCheckedInUsers } = useMemory();
  const { toggleModal, setTitle, setBody } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const signinUser = async (formValues: { phone: string }, e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userService = new UserService();
      const res = await userService.checkInUser(formValues.phone);
      const newCheckedInUser: CheckedInUser = { name: res.data.data.name, checkInTime: getCurrentTimeStamp() };
      await setCheckedInUsers([...checkedInUsers, newCheckedInUser]);

      // TODO: send text to customer with pts info

      router.push('/waitlist');
    } catch (error) {
      const errorText = parseError(error);

      setTitle(error.name);
      setBody(errorText);
      toggleModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer
      headerLeft='Welcome Back. '
      headerRight='Please Check-In'
      subHeader='Check-in and earn rewards points.'
      children={<FormSignIn onSubmit={signinUser} isLoading={isLoading} />}
    />
  );
};

export default signIn;
