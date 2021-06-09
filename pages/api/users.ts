import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const user: Prisma.UserCreateInput = JSON.parse(req.body);
    const savedUser = await prisma.user.create({ data: user });
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
};
