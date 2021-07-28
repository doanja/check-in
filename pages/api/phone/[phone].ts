import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, User } from '@prisma/client';
import twillio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SI;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const siteName = process.env.SITE_NAME;

const sendTwillioMsg = async (message: string, phone: string, delay: number) => {
  const twillioClient = twillio(accountSid, authToken);

  if (delay > 0) {
    setTimeout(() => {
      twillioClient.messages.create({
        body: message,
        from: twilioPhone,
        to: `+1${phone}`,
      });
    }, 10000);
  } else {
    await twillioClient.messages.create({
      body: message,
      from: twilioPhone,
      to: `+1${phone}`,
    });
  }
};

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

    sendTwillioMsg(`\nThank you for checking in at ${siteName}.\nWe will let you know when we're ready for you.`, phone, 0);

    sendTwillioMsg(`\nThis is a test message.`, phone, 10000);

    res.status(200).json({ data: updatedUser });
  } catch (error) {
    if (error.message.includes('Record to update not found')) {
      res.status(500).json({ errorName: error.name, errorMsg: 'Phone number is not registered.' });
    }

    res.status(500).json({ errorName: error.name, errorMsg: error.message, error });
  } finally {
    await prisma.$disconnect();
  }
};
