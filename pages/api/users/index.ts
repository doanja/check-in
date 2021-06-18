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
    res.status(500).json({ error });
  } finally {
    await prisma.$disconnect();
  }
};

const createUser = async (req: NextApiRequest, res: NextApiResponse, prisma: PrismaClient) => {
  try {
    const user: Prisma.UserCreateInput = JSON.parse(req.body);
    const newUser = await prisma.user.create({ data: user });
    console.log(`user`, user);
    res.status(200).json({ data: newUser });
  } catch (error) {
    res.status(500).json({ error });
  } finally {
    await prisma.$disconnect();
  }
};
