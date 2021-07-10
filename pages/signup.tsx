import React, { useState } from 'react';
import { PrismaClient, User, Prisma } from '@prisma/client';
import { FormSignUp } from 'components';
import { UserService } from 'services';
import { useModal } from '@/contexts/ModalContext';

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

// TODO: finish implementing this
const signUp = ({ initialUsers }: signupProps) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const { toggleModal, setTitle, setBody } = useModal();

  const createUser = async (user: Prisma.UserCreateInput, e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      // create user and automatically sign user in

      const userService = new UserService();
      const res = await userService.createUser(user);

      await setUsers([...users, res.data.data]);
      const res2 = await userService.checkInUser(res.data.data.phone);
      console.log(`res2`, res2);
    } catch (error) {
      setTitle('Error');

      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);

        // does not show helpful info
        // console.log(error.response.status);
        // console.log(error.response.headers);

        setBody(`${error.response.data.errorMsg}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
        setBody(`${error.request}`);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        setBody(`${error.message}`);
      }

      toggleModal(true);
    }
  };

  return (
    <div className='page-container'>
      <div className='mx-auto z-10 mt-48 text-center'>
        <h1 className='text-white text-5xl font-semibold'>
          Welcome to <span className='text-purple-300'>the Club</span>
        </h1>
        <p className='text-blue-300 mt-2'>Become a new member in 5 easy steps</p>
      </div>

      <div className='max-w-xl w-full mt-24 mb-24 rounded-md shadow-2xl bg-white mx-auto overflow-hidden z-10'>
        <div className='px-16 py-10'>
          <FormSignUp onSubmit={createUser} />
        </div>
      </div>
    </div>
  );
};

export default signUp;
