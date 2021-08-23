import { useState } from 'react';
import { useRouter } from 'next/router';
import { getCurrentTimeStamp, parseError } from '@/helper';
import { FormCheckIn } from '@/components';
import { useMemory } from 'contexts/MemoryContext';
import { useModal } from '@/contexts/ModalContext';
import { v4 as uuidv4 } from 'uuid';
import { UserService } from 'services';

const CheckInWrap = () => {
  const router = useRouter();
  const { checkedInUsers, setCheckedInUsers } = useMemory();
  const { toggleModal, setTitle, setBody } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const checkInUser = async (formValues: { name: string; phone?: string }, e: React.SyntheticEvent) => {
    e.preventDefault();

    if (formValues.phone) {
      signinUser(formValues.phone);
    } else {
      const newCheckedInUser: CheckedInUser = { id: uuidv4(), name: formValues.name, checkInTime: getCurrentTimeStamp(), isCheckedIn: false };
      await setCheckedInUsers([...checkedInUsers, newCheckedInUser]);
      router.push('/waitlist');
    }
  };

  const signinUser = async (phone: string) => {
    setIsLoading(true);

    try {
      const userService = new UserService();
      const res = await userService.checkInUser(phone);
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

  return <FormCheckIn onSubmit={checkInUser} isLoading={isLoading} />;
};

export default CheckInWrap;
