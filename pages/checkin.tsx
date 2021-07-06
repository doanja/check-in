import { CheckinForm } from 'components';
import { useMemory } from 'contexts/MemoryContext';

const checkin = () => {
  const { checkedInUsers, setCheckedInUsers } = useMemory();

  const checkinUser = async (formValues: { name: string }) => {
    const newCheckedInUser: CheckedInUser = { name: formValues.name, checkinTime: new Date().getTime().toString() };
    console.log('before checkin in');
    await setCheckedInUsers([...checkedInUsers, newCheckedInUser]);
    console.log('after checking in');
  };

  return (
    <div className='page-container'>
      <div className='mx-auto z-10 mt-48 text-center'>
        <h1 className='text-white text-5xl font-semibold'>
          Welcome to Back. <span className='text-purple-300'>Please Check In.</span>
        </h1>
        <p className='text-blue-300 mt-2'>Check in and earn points that can be used torwards rewards</p>
      </div>
      <div className='max-w-xl w-full mt-24 mb-24 rounded-md shadow-2xl bg-white mx-auto overflow-hidden z-10'>
        <div className='px-16 py-10'>
          <CheckinForm onSubmit={checkinUser} />
        </div>
      </div>
    </div>
  );
};

export default checkin;
