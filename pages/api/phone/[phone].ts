import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, User, Prisma } from '@prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();

  switch (req.method) {
    case 'PUT': {
      return checkInUser(req, res, prisma);
    }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

const checkInUser = async (req: NextApiRequest, res: NextApiResponse, prisma: PrismaClient) => {
  try {
    const phone = Array.isArray(req.query.phone) ? req.query.phone[0] : req.query.phone;

    const updatedUser: User | null = await prisma.user.update({
      where: { phone },
      data: {
        checkins: {
          increment: 1,
        },
        points: {
          increment: 1,
        },
      },
    });

    res.status(200).json({ data: updatedUser });
  } catch (error) {
    // TODO: finish error handling
    console.log(`error`, error);
    console.log(`error.name`, error.name);
    console.log(`error.shortMessage`, error.shortMessage);
    console.log(`error.message`, error.message);
    res.status(500).json({ /*error, message: 'user not found',*/ errorName: error.name, errorShrtMsg: error.shortMessage, errorMsg: error.message });
  } finally {
    await prisma.$disconnect();
  }
};
