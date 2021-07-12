import { FormCheckIn } from 'components';
import { useMemory } from 'contexts/MemoryContext';
import { useRouter } from 'next/router';

const CheckInContainer = () => {
  const router = useRouter();
  const { checkedInUsers, setCheckedInUsers } = useMemory();

  const getCurrentTimeStamp = (): string => {
    const date = new Date();
    const localTime = date.toLocaleTimeString();
    return localTime.replace(/:\d+ /, ' ');
  };

  const checkInUser = async (formValues: { name: string }) => {
    const newCheckedInUser: CheckedInUser = { name: formValues.name, checkInTime: getCurrentTimeStamp() };
    await setCheckedInUsers([...checkedInUsers, newCheckedInUser]);
    router.push('/waitlist');
  };

  return <FormCheckIn onSubmit={checkInUser} />;
};

export default CheckInContainer;
