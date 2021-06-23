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

      <div className='signup-half-section-upper'>
        <div className='signup-half-section-lower'></div>
        <div className='mx-auto z-10 mt-48 text-center'>
          <h1 className='text-white text-5xl font-semibold'>
            Welcome to <span className='text-yellow-500'>the Club</span>
          </h1>
          <p className='text-blue-200 mt-2'>Become a new member in 5 easy steps</p>
        </div>
        <div className='max-w-xl w-full mt-24 mb-24 rounded-lg shadow-2xl bg-white mx-auto overflow-hidden z-10'>
          <div className='px-16 py-10'>
            <SignupForm onSubmit={createUser} />
          </div>
        </div>
      </div>
    </>
  );
};

export default signup;
