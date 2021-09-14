import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, User } from '@prisma/client';
import prisma from '@/lib/prisma';
import { getCurrentISODate } from '@/helper';

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

    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        birthday: user.birthday,
        checkIns: {
          create: {
            date: getCurrentISODate(),
          },
        },
      },
      include: {
        checkIns: true,
      },
    });

    res.status(200).json({ data: newUser });
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(500).json({ errorName: error.name, errorMsg: 'Phone number or email address is already in use.' });
    } else {
      res.status(520).json({ errorName: error.name, errorMsg: 'An unknown error has occured.' });
    }
  } finally {
    await prisma.$disconnect();
  }
};
