import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import twillio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SI;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();

  switch (req.method) {
    case 'POST': {
      return test(req, res, prisma);
    }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

const test = async (req: NextApiRequest, res: NextApiResponse, prisma: PrismaClient) => {
  try {
    const { phoneNumber } = req.body;

    const client = twillio(accountSid, authToken);

    const message = await client.messages.create({
      body: `\n
    Your order from MODE™ has been shipped. USPS tracking number: 9405511108400829194984
    \n
    \n Download Shop to track your order: https://shop.app/sms`,
      from: twilioPhone,
      to: `+1${phoneNumber}`,
    });

    res.status(200).json({ data: message });
  } catch (error) {
    res.status(500).json({ errorName: error.name, errorMsg: error.message });
  } finally {
    await prisma.$disconnect();
  }
};
