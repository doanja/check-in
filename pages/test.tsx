import React, { useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';

import { PrismaClient, User, Prisma } from '@prisma/client';

import axios from 'axios';

import AddUserForm from './../components/AddUserForm';
import UserCard from '../components/UserCard';

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
      // const res = await fetch('/api/users', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(user),
      // });

      // if (!res.ok) {
      //   console.log(`res.statusText`, res.statusText);
      //   console.log(`res.json()`, await res.json());
      //   throw new Error(res.statusText);
      // }

      // console.log(`res.json()`, res.json());
      // return await res.json();

      // await Router.push('/');

      const res = await axios.post('/api/users', { user });

      console.log(`res`, res);
    } catch (error) {
      // console.error(error);
      console.log(error.response.status);
    }
  };

  const deleteUser = () => {
    try {
      const res = await axios.delete('/api/users', { user });

      console.log(`res`, res);
    } catch (error) {
      // console.error(error);
      console.log(error.response.status);
    }
  };
  // const onSubmit = async (data: User, e: any) => {
  //   try {
  //     await saveUser(data);
  //     setUsers([...users, data]);
  //     e.target.reset();
  //   } catch (err) {
  //     console.log(`err`, err);
  //     throw new Error(err);
  //   }
  // };

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
          <AddUserForm
            onSubmit={
              saveUser
              //   async (data: any, e: any) => {
              //   try {
              //     await saveUser(data);
              //     setUsers([...users, data]);
              //     e.target.reset();
              //   } catch (err) {
              //     console.log(`err`, err);
              //     throw new Error(err);
              //   }
              // }
            }
          />
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

        <button className='bg-blue-500 rounded-md p-4 text-blue-100' type='button' onClick={async (user: Prisma.UserCreateInput) => {}}>
          Delete user
        </button>
      </div>
    </>
  );
}
