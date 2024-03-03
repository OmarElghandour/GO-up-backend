// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import { PrismaClient } from '@prisma/client';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const handler =  NextAuth({
    providers: [
        Credentials({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            email: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials: any, _req: any) {
            // Add logic here to look up the user from the credentials supplied
            const user = await prisma.user.findUnique({where: {email: _req.body.email}});

            if (!user) {
                return null
            }

            bcrypt.compare(_req.body.password, user?.password, function (err, result) {
                if (err) {
                    console.log(err);
                }
            });

            if (user) {
              // Any object returned will be saved in `user` property of the JWT              
              return user
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              return null
      
              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
          }
        })
      ],
      secret: process.env.NEXTAUTH_SECRET,           
      session: { strategy: "jwt" }
});

export { handler as GET, handler as POST };

