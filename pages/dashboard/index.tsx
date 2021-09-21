import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { PageContainer } from '@/components';
import { UserService } from '@/services';

interface dashboardProps {
  users: User[];
}

const dashboard = ({ users }: dashboardProps) => {
  const content = (
    <div>
      {/* {users.map((user: User) => (
        <p>{user.name}</p>
      ))} */}
    </div>
  );

  return <PageContainer title='Dashboard' children={content} />;
};

export default dashboard;

export const getStaticProps: GetStaticProps = async context => {
  // const userService = new UserService();
  // const res = await userService.getUsers();

  // console.log(`res.data`, res.data);

  const response = await fetch('/api/users');
  const data = await response.json();
  console.log(`data`, data);

  return {
    props: {
      users: data.data,
    },
  };
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   // ...
// }
