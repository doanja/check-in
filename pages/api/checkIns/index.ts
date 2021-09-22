import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, CheckIn } from '@prisma/client';
import prisma from '@/lib/prisma';
import { getCurrentISODate } from '@/helper';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': {
      return getCheckIns(req, res, prisma);
    }

    case 'POST': {
      return createCheckIn(req, res, prisma);
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
    res.status(520).json({ errorName: 'Error', errorMsg: error });
  } finally {
    await prisma.$disconnect();
  }
};

const createCheckIn = async (req: NextApiRequest, res: NextApiResponse, prisma: PrismaClient) => {
  try {
    const newCheckIn = await prisma.checkIn.create({
      data: {
        date: getCurrentISODate(),
      },
    });

    res.status(200).json({ data: newCheckIn });
  } catch (error) {
    res.status(520).json({ errorName: 'Error', errorMsg: error });
  } finally {
    await prisma.$disconnect();
  }
};
