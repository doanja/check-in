import { CheckInContainer, PageContainer } from '@/components';

export default function Home() {
  const content = (
    <>
      <p className='button-label'>Check in:</p>
      <CheckInContainer />
    </>
  );

  return <PageContainer headerLeft='' children={content} />;
}
