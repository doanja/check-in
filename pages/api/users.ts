import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     const user: Prisma.UserCreateInput = JSON.parse(req.body);
//     const savedUser = await prisma.user.create({ data: user });
//     res.status(200).json(savedUser);
//   } catch (err) {
//     if (err instanceof Prisma.PrismaClientKnownRequestError) {
//       // The .code property can be accessed in a type-safe manner
//       if (err.code === 'P2002') {
//         console.log('There is a unique constraint violation, a new user cannot be created with this email');

//         res.status(400).json({ message: 'There is a unique constraint violation, a new user cannot be created with this email' });
//       }
//     }
//     throw err;
//   }
// };

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const prisma = new PrismaClient();

  switch (req.method) {
    case 'POST': {
      return createUser(req, res, prisma);
    }

    case 'DELETE': {
      return deleteUser(req, res, prisma);
    }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};

const createUser = async (req: NextApiRequest, res: NextApiResponse, prisma: PrismaClient) => {
  try {
    const user: Prisma.UserCreateInput = JSON.parse(req.body);
    const savedUser = await prisma.user.create({ data: user });
    res.status(200).json(savedUser);
  } catch (error) {
    console.log(`error:`, error.code);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        console.log('There is a unique constraint violation, a new user cannot be created with this email');

        res.status(400).json({ error: 'There is a unique constraint violation, a new user cannot be created with this email' });
      }
    }

    res.status(500).json({ error: 'Unable to save user to database' });
  } finally {
    await prisma.$disconnect();
  }
};

const deleteUser = async (req: NextApiRequest, res: NextApiResponse, prisma: PrismaClient) => {
  try {
    const user: Prisma.UserCreateInput = JSON.parse(req.body);
    const deletedUser = prisma.user.delete({
      where: {
        id: user.id,
      },
    });
    res.status(200).json(deletedUser);
  } catch (error) {
    console.log(`error:`, error.code);

    res.status(500).json({ error: 'Unable to delete user from database' });
  } finally {
    await prisma.$disconnect();
  }
};
