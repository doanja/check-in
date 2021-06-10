import { useState } from 'react';
import Head from 'next/head';
import { PrismaClient, User, Prisma } from '@prisma/client';
import AddUserForm from './../components/AddUserForm';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const users: User[] = await prisma.user.findMany();
  return {
    props: {
      initialUsers: users,
    },
  };
}

async function saveUser(user: Prisma.UserCreateInput) {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

interface testProps {
  initialUsers: User[];
}

export default function test({ initialUsers }: testProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
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
            onSubmit={async (data, e) => {
              try {
                await saveUser(data);
                setUsers([...users, data]);
                e.target.reset();
              } catch (err) {
                console.log(err);
              }
            }}
          />
        </section>
        <section className='w-2/3 h-screen p-8'>
          <div className='mb-3'>
            <h2 className='text-3xl text-gray-700'>Users</h2>
          </div>
        </section>
      </div>
    </>
  );
}
