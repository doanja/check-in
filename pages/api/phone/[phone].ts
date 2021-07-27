import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, User } from '@prisma/client';

import twillio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SI;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

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

    console.log(`phoneNumber`, phone);

    const client = twillio(accountSid, authToken);

    const message = await client.messages.create({
      body: `\n
    Your order from MODE™ has been shipped. USPS tracking number: 9405511108400829194984
    \n
    \n Download Shop to track your order: https://shop.app/sms`,
      from: twilioPhone,
      to: `+1${phone}`,
    });

    res.status(200).json({ data: updatedUser, message });
  } catch (error) {
    if (error.message.includes('Record to update not found')) {
      res.status(500).json({ errorName: error.name, errorMsg: 'Phone number is not registered.' });
    }

    res.status(500).json({ errorName: error.name, errorMsg: error.message, error });
  } finally {
    await prisma.$disconnect();
  }
};
