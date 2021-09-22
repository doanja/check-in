import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, User } from '@prisma/client';
import prisma from '@/lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      return getUser(req, res, prisma);
    }

    case 'DELETE': {
      return deleteUser(req, res, prisma);
    }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

const getUser = async (req: NextApiRequest, res: NextApiResponse, prisma: PrismaClient) => {
  try {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
    const user: User | null = await prisma.user.findUnique({ where: { id: parseInt(id) } });

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(520).json({ errorName: 'Error', errorMsg: `An unknown error has occured: ${error}` });
  } finally {
    await prisma.$disconnect();
  }
};

const deleteUser = async (req: NextApiRequest, res: NextApiResponse, prisma: PrismaClient) => {
  try {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

    const deletedUser: User = await prisma.user.delete({ where: { id: parseInt(id) } });

    res.status(200).json({ data: deletedUser });
  } catch (error) {
    res.status(520).json({ errorName: 'Error', errorMsg: `An unknown error has occured: ${error}` });
  } finally {
    await prisma.$disconnect();
  }
};
