import { CheckInContainer } from '@/components';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div className='page-container'>
      <div className='max-w-xl w-full mt-24 mb-24 rounded-md shadow-2xl bg-white mx-auto overflow-hidden z-10 text-center'>
        <div className='p-16'>
          <p className='text-gray-700 text-lg font-bold mb-3'>Check in without an account:</p>
          <CheckInContainer />

          <div className='loginSignUpSeparator'>
            <span className='textInSeparator'>or</span>
          </div>

          <p className='text-gray-700 text-lg font-bold mb-3'>Returning users:</p>
          <button onClick={() => router.push('/signin')} type='button' className='form-btn-secondary'>
            Sign in
          </button>

          <p className='text-gray-700 text-lg font-bold mb-3 mt-6'>New user? Signup here:</p>
          <button onClick={() => router.push('/signup')} type='button' className='form-btn-secondary'>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
