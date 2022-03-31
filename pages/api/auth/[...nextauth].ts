import { EncryptionCompare } from '@helpers/EncryptUID';
import { compareMinutes } from '@utils/compareMinutes';
import { supabase } from '@utils/supabaseClient';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        telegramId: { label: 'telegramId', type: 'text', placeholder: 'Enter Your TelegramId' },
        uniqueId: { label: 'uniqueId', type: 'text', placeholder: 'Enter Your UniqueID' },
      },
      async authorize(credentials, req) {
        /** Fetch User With TelegramID */
        const { data: userData } = await supabase.from('Users').select().eq('telegramId', credentials?.telegramId);

        if (userData) {
          const { data: userPersistedSession } = await supabase
            .from('UserSession')
            .select()
            .eq('telegramId', credentials?.telegramId);

          if (!userPersistedSession) {
            throw new Error('UniqueId Is Expired. Try To Generate Again.');
          }

          if (credentials?.uniqueId) {
            const isTrue =
              credentials.uniqueId &&
              (await EncryptionCompare(credentials.uniqueId, userPersistedSession[0].encryptedToken));
            if (!isTrue) {
              throw new Error('UniqueId Is Not Valid. Try To Generate Again.');
            }
          }

          if (!compareMinutes(userPersistedSession[0].createdOn)) {
            throw new Error('UniqueId Is Expired. Try To Generate Again.');
          }

          return {
            email: userData[0].email,
            name: userData[0].fullName,
            telegramId: userData[0].telegramId,
            role: userData[0].role,
          };
        }

        throw new Error('User Is Not Valid. Please Register YourSelf.');
      },
    }),
  ],
  session: {
    maxAge: 2 * 60 * 60, // 2 Hours
  },
  jwt: {
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
    maxAge: 2 * 60 * 60, //2 Hours
  },
  callbacks: {
    async jwt({ token, user }) {
      //Set role and telegramId into jwt token
      if (user?.role) {
        token.role = user.role;
      }
      if (user?.telegramId) {
        token.telegramId = user.telegramId;
      }
      return token;
    },
    async session({ session, token }) {
      //Set role and telegramId into session
      if (token?.role) {
        session.user.telegramId = token.telegramId as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
