import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma, User } from '@prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();

  switch (req.method) {
    case 'GET': {
      return getUsers(req, res, prisma);
    }

    case 'POST': {
      return createUser(req, res, prisma);
    }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

const getUsers = async (req: NextApiRequest, res: NextApiResponse, prisma: PrismaClient) => {
  try {
    const users: User[] = await prisma.user.findMany();

    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ error: 'Error getting users from database' });
  } finally {
    await prisma.$disconnect();
  }
};

const createUser = async (req: NextApiRequest, res: NextApiResponse, prisma: PrismaClient) => {
  try {
    const user: Prisma.UserCreateInput = JSON.parse(req.body);
    console.log(`user`, user);
    const savedUser = await prisma.user.create({ data: user });
    res.status(200).json(savedUser);
  } catch (error) {
    // console.log(`error:`, error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        console.log('There is a unique constraint violation, a new user cannot be created with this email');

        res.status(400).json({ error: 'There is a unique constraint violation, a new user cannot be created with this email' });
      }
    }

    res.status(500).json({ error: 'Unable to save user to database', message: error });
  } finally {
    await prisma.$disconnect();
  }
};
