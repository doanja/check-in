import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import twillio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SI;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();

  switch (req.method) {
    case 'GET': {
      return test(req, res, prisma);
    }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

const test = async (req: NextApiRequest, res: NextApiResponse, prisma: PrismaClient) => {
  console.log(`accountSid`, accountSid);
  console.log(`authToken`, authToken);
  console.log(`twilioPhone`, twilioPhone);

  const client = twillio(accountSid, authToken);

  const message = await client.messages.create({
    body: `\n
    Your order from MODE™ has been shipped. USPS tracking number: 9405511108400829194984
    \n
    \n Download Shop to track your order: https://shop.app/sms`,
    from: twilioPhone, // my twilio testing number
    to: `+12533355485`,
  });
  res.json(message);
};
