import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, CheckIn } from '@prisma/client';
import prisma from '@/lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      return getCheckIns(req, res, prisma);
    }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

const getCheckIns = async (req: NextApiRequest, res: NextApiResponse, prisma: PrismaClient) => {
  try {
    const checkIns: CheckIn[] = await prisma.checkIn.findMany();

    res.status(200).json({ data: checkIns });
  } catch (error) {
    res.status(500).json({ error });
  } finally {
    await prisma.$disconnect();
  }
};
