import React, { useState } from 'react';
import Head from 'next/head';
import { PrismaClient, User, Prisma } from '@prisma/client';
import AddUserForm from './../components/AddUserForm';
import UserCard from '../components/UserCard';

const prisma = new PrismaClient();

// wtf does this do?
export const getServerSideProps = async () => {
  const users: User[] = await prisma.user.findMany();
  return {
    props: {
      initialUsers: users,
    },
  };
};

const saveUser = async (user: Prisma.UserCreateInput) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
};

interface TestProps {
  initialUsers: User[];
}

export default function test({ initialUsers }: TestProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);

  const onSubmit = async (data: User, e: any) => {
    try {
      await saveUser(data);
      setUsers([...users, data]);
      e.target.reset();
    } catch (err) {
      console.log(`err`, err);
      throw new Error(err);
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
          <AddUserForm
            onSubmit={
              onSubmit
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
      </div>
    </>
  );
}
