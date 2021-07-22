import { getCurrentTimeStamp } from '@/helper';
import { FormCheckIn } from '@/components';
import { useMemory } from 'contexts/MemoryContext';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

const CheckInContainer = () => {
  const router = useRouter();
  const { checkedInUsers, setCheckedInUsers } = useMemory();

  const checkInUser = async (formValues: { name: string }) => {
    const newCheckedInUser: CheckedInUser = { id: uuidv4(), name: formValues.name, checkInTime: getCurrentTimeStamp(), isCheckedIn: false };
    await setCheckedInUsers([...checkedInUsers, newCheckedInUser]);
    router.push('/waitlist');
  };

  return <FormCheckIn onSubmit={checkInUser} />;
};

export default CheckInContainer;
