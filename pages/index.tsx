import { CheckInContainer, PageContainer } from '@/components';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const content = (
    <div>
      <p className='button-label'>Check in without an account:</p>

      <CheckInContainer />

      <div className='relative text-center my-12 mb-5 mx-2 border-t-2 border-gray-400'>
        <span className='relative py-0 px-2 -top-3 bg-white text-gray-400'>or</span>
      </div>

      <p className='button-label'>Returning users:</p>
      <button onClick={() => router.push('/signin')} type='button' className='form-btn-secondary'>
        Sign in
      </button>

      <p className='button-label mt-6'>New user? Signup here:</p>
      <button onClick={() => router.push('/signup')} type='button' className='form-btn-secondary'>
        Sign Up
      </button>
    </div>
  );

  return <PageContainer headerLeft='' children={content} />;
}
