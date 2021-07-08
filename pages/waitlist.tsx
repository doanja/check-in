import { WaitlistTable } from '@/components';
import { useRouter } from 'next/router';

const waitlist = () => {
  const router = useRouter();

  return (
    <div className='page-container'>
      <div className='mx-auto z-10 mt-48 text-center'>
        <h1 className='text-white text-5xl font-semibold'>
          Wait<span className='text-purple-300'>List</span>
        </h1>
      </div>

      <WaitlistTable />

      <button onClick={() => router.push('/')} type='button' className='form-btn-primary mt-3 max-w-md mx-auto'>
        Home
      </button>
    </div>
  );
};

export default waitlist;
