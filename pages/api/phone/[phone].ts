import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, User } from '@prisma/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();

  switch (req.method) {
    case 'PUT': {
      return checkinUser(req, res, prisma);
    }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

const checkinUser = async (req: NextApiRequest, res: NextApiResponse, prisma: PrismaClient) => {
  console.log(`req.query`, req.query.phone);
  try {
    const phone = Array.isArray(req.query.phone) ? req.query.phone[0] : req.query.phone;
    const user: User | null = await prisma.user.findUnique({ where: { phone } });

    const updatedUser: User | null = await prisma.user.update({
      where: { phone: phone },
      data: { checkins: user!.checkins + 1, points: user!.points + 1 },
    });

    res.status(200).json({ data: updatedUser });
  } catch (error) {
    res.status(500).json({ error });
  } finally {
    await prisma.$disconnect();
  }
};
