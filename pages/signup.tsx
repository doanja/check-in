import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { PrismaClient, User, Prisma } from '@prisma/client';
import { SignupForm } from 'components';
import { UserService } from 'services';

const userService = new UserService();

// wtf does this do? -- gets data from the backend and stores it as props?
export const getServerSideProps = async () => {
  const prisma = new PrismaClient();

  const users: User[] = await prisma.user.findMany();
  await prisma.$disconnect();

  return {
    props: {
      initialUsers: users,
    },
  };
};

interface signupProps {
  initialUsers: User[];
}

const signup = ({ initialUsers }: signupProps) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const router = useRouter();

  const createUser = async (user: Prisma.UserCreateInput, e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await userService.createUser(user);
      await setUsers([...users, res.data.data]);
      console.log('res.data :>> ', res.data);
      router.push('/users');
    } catch (error) {
      console.log(error.response.status);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const res = await userService.deleteUser(userId);
      const filteredUsers: User[] = users.filter((user: User) => res.data.data.id !== user.id);
      setUsers(filteredUsers);
    } catch (error) {
      console.log(error.response.status);
    }
  };

  return (
    <>
      <Head>
        <title>Check In</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='container w-screen'>
        <section className='bg-gray-800 p-8 w-screen'>
          <SignupForm onSubmit={createUser} />
        </section>
      </div>
    </>
  );
};

export default signup;
