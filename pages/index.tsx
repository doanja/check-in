import { CheckInWrap, PageContainer } from '@/components';

export default function Home() {
  const content = (
    <>
      <p className='button-label'>Check in:</p>
      <CheckInWrap />
    </>
  );

  return <PageContainer headerLeft='' children={content} />;
}
