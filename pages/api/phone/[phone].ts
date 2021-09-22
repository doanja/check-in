import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, User, Prisma } from '@prisma/client';
import twillio from 'twilio';
import prisma from '@/lib/prisma';
import env from '@/lib/env';
import { getCurrentISODate } from '@/helper';

const sendTwilioMsg = async (message: string, phone: string, delay: number) => {
  const twillioClient = twillio(env.accountSid, env.authToken);

  try {
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
  } catch (error) {
    console.log(`error`, error);
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

    await prisma.checkIn.create({
      data: {
        date: getCurrentISODate(),
        userId: updatedUser.id,
      },
    });

    // message sent immediately
    sendTwilioMsg(
      `\n${env.siteName}:
      \nThank you for checking in. We will let you know when we're ready for you.
      \nReply STOP to unsubscribe.`,
      phone,
      0
    );

    // delayed Message
    sendTwilioMsg(
      `\n${env.siteName}:
    \nThank you for your recent visit. Please let us know how you feel about your recent visit using this link: (${env.reviewLink})
    \nReply STOP to unsubscribe.`,
      phone,
      1000 * 60 * 60
    );

    res.status(200).json({ data: updatedUser });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.message.includes('Record to update not found')) {
      res.status(500).json({ errorName: 'Error', errorMsg: 'Phone number is not registered.' });
    } else {
      res.status(520).json({ errorName: 'Error', errorMsg: `An unknown error has occured: ${error}` });
    }
  } finally {
    await prisma.$disconnect();
  }
};
