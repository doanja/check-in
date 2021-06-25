import { CheckinForm } from '@/components';
import { useState } from 'react';
import { UserService } from 'services';

const userService = new UserService();

const checkin = () => {
  const [checkedIn, setCheckedIn] = useState(false);

  const checkinUser = async (formValues: { phone: string }, e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const res = await userService.checkInUser(formValues.phone);
      // set name and pts here for welcome message
      console.log('res.data :>> ', res.data);
      setCheckedIn(true);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className='layout-bottom'>
      {checkedIn ? (
        <h1>user checked in</h1>
      ) : (
        <>
          <div className='mx-auto z-10 mt-48 text-center'>
            <h1 className='text-white text-5xl font-semibold'>
              Welcome to Back. <span className='text-purle-300'>Please Check In.</span>
            </h1>
            <p className='text-blue-300 mt-2'>Check in and earn points that can be used torwards rewards</p>
          </div>
          <div className='max-w-xl w-full mt-24 mb-24 rounded-md shadow-2xl bg-white mx-auto overflow-hidden z-10'>
            <div className='px-16 py-10'>
              <CheckinForm onSubmit={checkinUser} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default checkin;
