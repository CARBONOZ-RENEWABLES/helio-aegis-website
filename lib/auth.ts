import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from './mongodb';
import User from '@/models/User';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email, isActive: true }).select('+hashedPassword');
        
        if (!user || !await bcrypt.compare(credentials.password as string, user.hashedPassword)) {
          return null;
        }

        user.lastLogin = new Date();
        await user.save();

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          permissions: user.permissions
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role as any;
        token.permissions = JSON.parse(JSON.stringify(user.permissions));
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as any;
        session.user.permissions = token.permissions as any;
      }
      return session;
    }
  },
  pages: {
    signIn: '/admin/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60
  }
});
