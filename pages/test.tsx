import { useState } from 'react';
import Head from 'next/head';

import { PrismaClient, User, Prisma } from '@prisma/client';

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

export default function Index({ initialUsers }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  return (
    <>
      <Head>
        <title>Contacts App</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <link href='https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css' rel='stylesheet' />
      </Head>
      <div className='flex'>
        <section className='w-1/3 bg-gray-800 h-screen p-8'>
          <div className='mb-3'>
            <h2 className='text-3xl text-white'>Add a Contact</h2>
          </div>
        </section>
        <section className='w-2/3 h-screen p-8'>
          <div className='mb-3'>
            <h2 className='text-3xl text-gray-700'>Contacts</h2>
          </div>
        </section>
      </div>
    </>
  );
}
