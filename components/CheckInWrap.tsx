import { useState } from 'react';
import { useRouter } from 'next/router';
import { getCurrentTimeStamp, parseError } from '@/helper';
import { FormCheckIn, FormCheckInPhone } from '@/components';
import { useMemory, useModal } from '@/contexts';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from '@/services';

interface CheckInWrapProps {
  isNewUser: boolean;
}

const CheckInWrap = ({ isNewUser }: CheckInWrapProps) => {
  const router = useRouter();
  const { checkedInUsers, setCheckedInUsers } = useMemory();
  const { toggleModal, setTitle, setBody } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const checkInUser = async (formValues: { name: string }) => {
    const newCheckedInUser: CheckedInUser = { id: uuidv4(), name: formValues.name, checkInTime: getCurrentTimeStamp(), isCheckedIn: false };
    await setCheckedInUsers([...checkedInUsers, newCheckedInUser]);
    router.push('/waitlist');
  };

  const signinUser = async (formValues: { phone: string }) => {
    setIsLoading(true);

    try {
      const userService = new UserService();
      const res = await userService.checkInUser(formValues.phone);

      const { name, phoneNumber } = res.data.data;

      const newCheckedInUser: CheckedInUser = { id: uuidv4(), name, phoneNumber, checkInTime: getCurrentTimeStamp(), isCheckedIn: false };
      await setCheckedInUsers([...checkedInUsers, newCheckedInUser]);

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
    <>{isNewUser ? <FormCheckIn onSubmit={checkInUser} isLoading={isLoading} /> : <FormCheckInPhone onSubmit={signinUser} isLoading={isLoading} />}</>
  );
};

export default CheckInWrap;
