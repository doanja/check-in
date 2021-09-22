import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, CheckIn } from '@prisma/client';
import prisma from '@/lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      return getCheckIn(req, res, prisma);
    }

    case 'DELETE': {
      return deleteCheckIn(req, res, prisma);
    }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

const getCheckIn = async (req: NextApiRequest, res: NextApiResponse, prisma: PrismaClient) => {
  try {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
    const checkIns: CheckIn[] | null = await prisma.checkIn.findMany({ where: { userId: parseInt(id) } });

    res.status(200).json({ data: checkIns });
  } catch (error) {
    res.status(520).json({ errorName: 'Error', errorMsg: error });
  } finally {
    await prisma.$disconnect();
  }
};

const deleteCheckIn = async (req: NextApiRequest, res: NextApiResponse, prisma: PrismaClient) => {
  try {
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

    const deletedCheckIn: CheckIn = await prisma.checkIn.delete({ where: { id: parseInt(id) } });

    res.status(200).json({ data: deletedCheckIn });
  } catch (error) {
    res.status(520).json({ errorName: 'Error', errorMsg: error });
  } finally {
    await prisma.$disconnect();
  }
};
