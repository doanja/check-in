import React, { useState } from 'react';
import Head from 'next/head';

import { PrismaClient, User } from '@prisma/client';
import { UserCard } from 'components';

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

interface UsersProps {
  initialUsers: User[];
}

export default function users({ initialUsers }: UsersProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);

  return (
    <>
      <Head>
        <title>Check In</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div className='flex'>
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
