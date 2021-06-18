import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma, User } from '@prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();

  switch (req.method) {
    case 'GET': {
      return getUser(req, res, prisma);
    }

    case 'PUT': {
      return updateUser(req, res, prisma);
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

    const user: User | null = await prisma.user.findUnique({ where: { id } });

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ error });
  } finally {
    await prisma.$disconnect();
  }
};

// not used
const updateUser = async (req: NextApiRequest, res: NextApiResponse, prisma: PrismaClient) => {
  try {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

    const user: User | null = await prisma.user.update({ where: { id }, data: {} });

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ error });
  } finally {
    await prisma.$disconnect();
  }
};

const deleteUser = async (req: NextApiRequest, res: NextApiResponse, prisma: PrismaClient) => {
  try {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

    const deletedUser: User = await prisma.user.delete({ where: { id } });

    res.status(200).json({ data: deletedUser });
  } catch (error) {
    res.status(500).json({ error });
  } finally {
    await prisma.$disconnect();
  }
};
