import { CheckinForm } from '@/components';
import { useRouter } from 'next/router';
import { UserService } from 'services';

const userService = new UserService();

const checkin = () => {
  const router = useRouter();

  const checkinUser = async (userId: string, e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await userService.checkInUser(userId);
      router.push('/users');
    } catch (error) {
      if (error.meta.target === 'phone_unique') {
        alert('Phone must be unique');
      } else if (error.meta.target === 'email_unique') {
        alert('Email must be unique');
      }
    }
  };

  return (
    <div className='layout-bottom'>
      <div className='mx-auto z-10 mt-48 text-center'>
        <h1 className='text-white text-5xl font-semibold'>
          Welcome to <span className='text-purle-300'>the Club</span>
        </h1>
        <p className='text-blue-300 mt-2'>Become a new member in 5 easy steps</p>
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
