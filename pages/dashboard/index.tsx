import { GetStaticProps } from 'next';
import { PageContainer, UserTableRow } from '@/components';
import { UserService } from '@/services';

interface dashboardProps {
  users: User[];
}

const dashboard = ({ users }: dashboardProps) => {
  return (
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
                  <th scope='col' className='relative px-6 py-3'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              {users.map((user: User) => (
                <UserTableRow user={user} key={user.id} />
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboard;

export const getStaticProps: GetStaticProps = async context => {
  const userService = new UserService();
  const res = await userService.getUsers();

  return {
    props: {
      users: res.data.data,
    },
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   // ...
// }
