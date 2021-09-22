import { useState } from 'react';
import { useRouter } from 'next/router';
import { getCurrentTimeStamp, parseError } from '@/helper';
import { FormCheckIn, FormCheckInPhone } from '@/components';
import { useMemory, useModal } from '@/contexts';
import { v4 as uuidv4 } from 'uuid';
import { CheckInService, UserService } from '@/services';

interface CheckInWrapProps {
  isNewUser: boolean;
}

const CheckInWrap = ({ isNewUser }: CheckInWrapProps) => {
  const router = useRouter();
  const { checkedInUsers, setCheckedInUsers } = useMemory();
  const { toggleModal, setTitle, setBody } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const checkInUser = async (formValues: { name: string }) => {
    setIsLoading(true);

    try {
      const checkInService = new CheckInService();
      await checkInService.createCheckIn();

      const newCheckedInUser: CheckedInUser = { id: uuidv4(), name: formValues.name, checkInTime: getCurrentTimeStamp(), isCheckedIn: false };
      await setCheckedInUsers([...checkedInUsers, newCheckedInUser]);
      router.push('/waitlist');
    } catch (error: any) {
      const errorText = parseError(error);

      setTitle('Error');
      setBody(errorText);
      toggleModal(true);
    } finally {
      setIsLoading(false);
    }
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
    } catch (error: any) {
      const errorText = parseError(error);

      setTitle('Error');
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
