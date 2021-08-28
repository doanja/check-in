import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, User } from '@prisma/client';
import twillio from 'twilio';
import prisma from '@/lib/prisma';
import env from '@/lib/env';

const sendTwillioMsg = async (message: string, phone: string, delay: number) => {
  const twillioClient = twillio(env.accountSid, env.authToken);

  if (delay > 0) {
    setTimeout(() => {
      twillioClient.messages.create({
        body: message,
        from: env.twilioPhone,
        to: `+1${phone}`,
      });
    }, 10000);
  } else {
    await twillioClient.messages.create({
      body: message,
      from: env.twilioPhone,
      to: `+1${phone}`,
    });
  }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
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

    // message sent immediately
    sendTwillioMsg(
      `\nThank you for checking in.
      \nWe will let you know when we're ready for you.
      \n\nReply STOP to unsubscribe.`,
      phone,
      0
    );

    // delayed Message
    sendTwillioMsg(`\nThis is a test message.`, phone, 3600000);

    res.status(200).json({ data: updatedUser });
  } catch (error) {
    if (error.message.includes('Record to update not found')) {
      res.status(500).json({ errorName: error.name, errorMsg: 'Phone number is not registered.' });
    } else {
      res.status(520).json({ errorName: error.name, errorMsg: 'An unknown error has occured.' });
    }
  } finally {
    await prisma.$disconnect();
  }
};
