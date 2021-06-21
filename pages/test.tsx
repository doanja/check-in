import React, { useState } from 'react';
import Head from 'next/head';
// import Router from 'next/router';
import { PrismaClient, User, Prisma } from '@prisma/client';
import { AddUserForm, UserCard } from 'components';
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

interface TestProps {
  initialUsers: User[];
}

export default function test({ initialUsers }: TestProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const saveUser = async (user: Prisma.UserCreateInput, e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await userService.createUser(user);
      setUsers([...users, res.data.data]);
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
      <div className='flex'>
        <section className='w-1/3 bg-gray-800 h-screen p-8'>
          <div className='mb-3'>
            <h2 className='text-3xl text-white'>Add a User</h2>
          </div>
          <AddUserForm onSubmit={saveUser} />
        </section>
        <section className='w-2/3 h-screen p-8'>
          <div className='mb-3'>
            <h2 className='text-3xl text-gray-700'>Users</h2>
          </div>
          {users.map((user: User, i: number) => (
            <div className='mb-3' key={i}>
              <UserCard user={user} />
            </div>
          ))}
        </section>

        <button className='bg-blue-500 rounded-md p-4 text-blue-100' type='button' onClick={() => deleteUser('ckq6yd3ow0000irnvawd4bpfz')}>
          Delete user
        </button>
      </div>
    </>
  );
}
