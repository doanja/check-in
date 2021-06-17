import React, { useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';

import { User, Prisma } from '@prisma/client';

import AddUserForm from './../components/AddUserForm';
import UserCard from '../components/UserCard';
import UserService from '../services/users';

const userService = new UserService();

// wtf does this do? -- gets data from the backend and stores it as props?
export const getServerSideProps = async () => {
  try {
    const res = await userService.getUsers();

    return {
      props: {
        initialUsers: res.data.data,
      },
    };
  } catch (error) {
    console.log(`error`, error);
  }

  return {
    props: {
      initialUsers: [],
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

      console.log(`res`, res);
    } catch (error) {
      // console.error(error);
      console.log(error.response.status);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const res = await userService.deleteUser(userId);

      console.log(`res`, res);
    } catch (error) {
      // console.error(error);
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

        <button className='bg-blue-500 rounded-md p-4 text-blue-100' type='button' onClick={() => deleteUser('ckpyiuldv0000byo52kngfz97')}>
          Delete user
        </button>
      </div>
    </>
  );
}
