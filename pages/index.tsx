import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div className='page-container'>
      <div className='mx-auto z-10 mt-48 text-center'>
        <h1 className='text-white text-5xl font-semibold'>
          Welcome to <span className='text-purple-300'>Back</span>
        </h1>
      </div>

      <div className='max-w-xl w-full mt-24 mb-24 rounded-md shadow-2xl bg-white mx-auto overflow-hidden z-10'>
        <div className='px-16 py-10'>
          <p className='mb-3'>Returning and new users:</p>
          <div className='form-btn-group'>
            <button onClick={() => router.push('/signin')} type='button' className='form-btn-secondary'>
              Sign in
            </button>
            <button onClick={() => router.push('/signup')} type='button' className='form-btn-secondary'>
              Sign up
            </button>
          </div>

          <p className='mb-3'>Checkin without an account:</p>
          <button onClick={() => router.push('/checkin')} type='button' className='form-btn-primary'>
            Checkin
          </button>
        </div>
      </div>
    </div>
  );
}
