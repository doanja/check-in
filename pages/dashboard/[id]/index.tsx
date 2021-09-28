import { GetStaticProps, GetStaticPaths } from 'next';
import { CheckInService, UserService } from '@/services';
import { UserTableRow } from '@/components';
import { Fragment } from 'react';

export type BarsProps = {
  width: number;
  height: number;
  events?: boolean;
};

interface dashboardProps {
  singleUserCheckIn: SingleUserCheckIn[];
  user: User;
}

const dashboard = ({ singleUserCheckIn, user }: dashboardProps) => {
  console.log(`singleUserCheckIn`, singleUserCheckIn);
  return (
    <Fragment>
      {/* table */}
      <div className='flex flex-col mx-10'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='shadow overflow-hidden border-b border-gray-200'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Name
                    </th>
                    <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Email
                    </th>
                    <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Phone
                    </th>
                    <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Birthday
                    </th>
                    <th scope='col' className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Number of Check-ins
                    </th>
                  </tr>
                </thead>

                <UserTableRow user={user} key={user.id} showDetails={false} />
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* graphs here */}
    </Fragment>
  );
};

export default dashboard;

export const getStaticProps: GetStaticProps = async (context: any) => {
  const checkInService = new CheckInService();
  const res = await checkInService.getSingleUserCheckIns(context.params.id);

  const userService = new UserService();
  const res2 = await userService.getUserById(context.params.id);

  return {
    props: {
      singleUserCheckIn: res.data.data,
      user: res2.data.data,
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
