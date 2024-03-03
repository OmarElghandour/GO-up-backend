// import prisma from '@/lib/prisma'
import { PrismaClient } from '@prisma/client';
import { NextApiResponse } from 'next'
import { NextRequest } from 'next/server';
 
type ResponseData = {
  message: string
}
 
export async function GET(request: NextRequest, response: NextApiResponse<ResponseData>) {
  const email = request.nextUrl.searchParams.get('email') || '';
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({ where: { email: email } });
  if (!user) {
    return response.status(404).json({ message: 'User not found' });
  }

  return new Response(JSON.stringify(user), { status: 200 });
}


