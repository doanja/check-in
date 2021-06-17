import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from '@prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();

  switch (req.method) {
    case 'DELETE': {
      return deleteUser(req, res, prisma);
    }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

const deleteUser = async (req: NextApiRequest, res: NextApiResponse, prisma: PrismaClient) => {
  try {
    const id = req.query.id;

    console.log(`id`, typeof id);

    prisma.user.delete({ where: { email: 'spandexerjd@gmail.com' } });

    res.status(200).json({ message: `User deleted with ID ${id}` });
  } catch (error) {
    console.log(`error:`, error.code);

    res.status(500).json({ error: 'Unable to delete user from database' });
  } finally {
    await prisma.$disconnect();
  }
};
