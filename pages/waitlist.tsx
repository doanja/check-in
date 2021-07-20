import { PageContainer, WaitlistTable } from '@/components';
import { useRouter } from 'next/router';

const waitlist = () => {
  const router = useRouter();

  return (
    <PageContainer
      headerLeft='Wait'
      headerRight='list'
      children={
        <>
          <WaitlistTable />

          <button onClick={() => router.push('/')} type='button' className='form-btn-primary my-3 max-w-md mx-auto'>
            Home
          </button>
        </>
      }
    />
  );
};

export default waitlist;
