import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, User } from '@prisma/client';
import prisma from '@/lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
    const { user } = req.body;

    if (user.email) {
      const newUser = await prisma.user.create({ data: user });
      res.status(200).json({ data: newUser });
    } else {
      const newUser = await prisma.user.create({ data: { name: user.name, birthday: user.birthday, phone: user.phone } });
      res.status(200).json({ data: newUser });
    }
  } catch (error) {
    if (error.message.includes('phone_unique')) {
      res.status(500).json({ errorName: error.name, errorMsg: 'Phone number already in use.' });
    }

    res.status(500).json({ errorName: error.name, errorMsg: error.message });
  } finally {
    await prisma.$disconnect();
  }
};
