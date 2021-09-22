import { GetStaticProps } from 'next';
import { PageContainer } from '@/components';
import { UserService } from '@/services';

interface dashboardProps {
  users: User[];
}

const dashboard = ({ users }: dashboardProps) => {
  const content = (
    <div>
      <h1>dashboard</h1>
      {/* {users.map((user: User) => (
        <p key={user.id}>{user.name}</p>
      ))} */}
    </div>
  );

  return <PageContainer title='Dashboard' children={content} />;
};

export default dashboard;

// export const getStaticProps: GetStaticProps = async context => {
//   const userService = new UserService();
//   const res = await userService.getUsers();

//   return {
//     props: {
//       users: res.data.data,
//     },
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   // ...
// }
