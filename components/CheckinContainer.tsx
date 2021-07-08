import { CheckinForm } from 'components';
import { useMemory } from 'contexts/MemoryContext';
import { useRouter } from 'next/router';

const CheckinContainer = () => {
  const router = useRouter();
  const { checkedInUsers, setCheckedInUsers } = useMemory();

  const getCurrentTimeStamp = (): string => {
    const date = new Date();
    const localTime = date.toLocaleTimeString();
    return localTime.replace(/:\d+ /, ' ');
  };

  const checkinUser = async (formValues: { name: string }) => {
    const newCheckedInUser: CheckedInUser = { name: formValues.name, checkinTime: getCurrentTimeStamp() };
    await setCheckedInUsers([...checkedInUsers, newCheckedInUser]);
    router.push('/waitlist');
  };

  return (
    <div className='px-16'>
      <CheckinForm onSubmit={checkinUser} />
    </div>
  );
};

export default CheckinContainer;
