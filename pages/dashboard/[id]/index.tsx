import { GetStaticProps, GetStaticPaths } from 'next';
import { CheckInService } from '@/services';

interface dashboardProps {
  singleUserCheckIn: SingleUserCheckIn[];
}

const dashboard = ({ singleUserCheckIn }: dashboardProps) => {
  console.log(`singleUserCheckIn`, singleUserCheckIn);
  return (
    <div className='flex flex-col mx-10'>
      <p>test</p>
    </div>
  );
};

export default dashboard;

export const getStaticProps: GetStaticProps = async (context: any) => {
  const checkInService = new CheckInService();
  const res = await checkInService.getSingleUserCheckIns(context.params.id);

  return {
    props: {
      singleUserCheckIn: res.data.data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const checkInService = new CheckInService();
  const res = await checkInService.getCheckIns();

  const ids: number[] = res.data.data.map((checkIn: SingleUserCheckIn) => checkIn.userId);
  const paths = ids.map((id: number) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};
