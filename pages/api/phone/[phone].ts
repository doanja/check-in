import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, User, CheckIn } from '@prisma/client';
import twillio from 'twilio';
import prisma from '@/lib/prisma';
import env from '@/lib/env';
import { getCurrentTimeStamp } from '@/helper';

const sendTwillioMsg = async (message: string, phone: string, delay: number) => {
  const twillioClient = twillio(env.accountSid, env.authToken);

  if (delay > 0) {
    setTimeout(() => {
      twillioClient.messages.create({
        body: message,
        from: env.twilioPhone,
        to: `+1${phone}`,
      });
    }, delay);
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
        checkInCount: {
          increment: 1,
        },
        points: {
          increment: 1,
        },
      },
    });

    const newCheckIn = await prisma.checkIn.create({
      data: {
        date: getCurrentTimeStamp(),
        userId: updatedUser.id,
      },
    });

    // message sent immediately
    sendTwillioMsg(
      `\n${env.siteName}:
      \nThank you for checking in. We will let you know when we're ready for you.
      \nReply STOP to unsubscribe.`,
      phone,
      0
    );

    // delayed Message
    sendTwillioMsg(
      `\n${env.siteName}:
    \nThank you for your recent visit. Please let us know how you feel about your recent visit using this link: (${env.reviewLink})
    \nReply STOP to unsubscribe.`,
      phone,
      1000 * 60 * 60
    );

    res.status(200).json({ data: updatedUser, newCheckIn });
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
