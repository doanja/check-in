import { CheckInContainer } from '@/components';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div className='page-container'>
      {/* <div className='mx-auto z-10 mt-48 text-center'>
        <h1 className='text-white text-5xl font-semibold'>
          Welcome to <span className='text-purple-300'>askljdf;lkajsdf</span>
        </h1>
      </div> */}

      <div className='max-w-xl w-full mt-24 mb-24 rounded-md shadow-2xl bg-white mx-auto overflow-hidden z-10 text-center'>
        <div className='p-16'>
          <p className='text-gray-700 text-lg font-bold mb-3'>Returning users:</p>
          <button onClick={() => router.push('/signin')} type='button' className='form-btn-secondary'>
            Sign in
          </button>

          <p className='text-gray-700 text-lg font-bold mb-3 mt-6'>New user? Signup to earn points:</p>
          <button onClick={() => router.push('/signup')} type='button' className='form-btn-secondary'>
            Sign Up
          </button>

          <div className='loginSignUpSeparator'>
            <span className='textInSeparator'>or</span>
          </div>

          <p className='text-gray-700 text-lg font-bold mb-3'>Check in without an account:</p>
          <CheckInContainer />
        </div>
      </div>
    </div>
  );
}
