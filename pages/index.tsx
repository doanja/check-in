import { CheckInWrap, PageContainer } from '@/components';

export default function Home() {
  const renderedContent = (
    <>
      <CheckInWrap isNewUser={true} />

      <div className='relative text-center my-12 mb-5 mx-2 border-t-2 border-gray-400'>
        <span className='relative py-0 px-2 -top-3 bg-gray-900'>or</span>
      </div>

      <CheckInWrap isNewUser={false} />
    </>
  );

  return <PageContainer title='check in' children={renderedContent} />;
}
