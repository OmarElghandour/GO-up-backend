// import prisma from '@/lib/prisma'
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest } from 'next/server';
 
type ResponseData = {
  message: string
}


export async function POST(request: NextRequest, response: NextApiResponse<ResponseData>) {
  const requestData = await request.json();
  const {description, startDate, endDate, title, user } = requestData;
  const prisma = new PrismaClient();


  const sdate = new Date(startDate); // Create a new Date object from the timestamp
  const isoStartDateTime = sdate.toISOString(); // Convert the date to ISO 8601 format
  
  const edate = new Date(endDate); // Create a new Date object from the timestamp
  const isoEndDateTime = edate.toISOString(); // Convert the date to ISO 8601 format
  const task = await prisma.task.create({
    data: {
      startDate : isoStartDateTime,
      endDate : isoEndDateTime,
      title,
      content : description,
      User : {
        connect : {
          id : user.id
        }
      }
    },
  });
  return new Response(JSON.stringify('task'), { status: 200 });
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


