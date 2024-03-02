// import prisma from '@/lib/prisma'
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {


  console.log('===========================');
  console.log(req.body);
  const prisma  = new PrismaClient();
  // get user from db

  const requestData = JSON.parse(req.body);
  const user = await prisma.user.findUnique({where: {email: requestData?.email}});

  if (!user) {
      return res.status(404).json({ message : 'User not found' });
  }

  res.status(200).json({message : JSON.stringify( user)});
}