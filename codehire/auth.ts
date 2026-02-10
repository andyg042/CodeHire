import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import { compare } from "bcrypt"
import { prisma } from "@/lib/prisma"

export const { handlers, auth, signIn, signOut } = NextAuth({
    session: {
        strategy: "jwt"
    },

  providers: [
    CredentialsProvider({
        name: "Sign in",
        credentials: {
            email: { label: "Email", type: "email", placeholder: "you@example.com" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            if (!credentials.email || !credentials.password) {
                return null;
            }
            const user = await prisma.user.findUnique({
                where: { email: credentials.email as string }
            });

            if (!user) {
                return null;
            }

            const isPasswordValid = await compare(
                credentials.password as string,
                user.password
            );
            if (!isPasswordValid) {
                return null;
            }

            return {
                id: user.id + '',
                email: user.email,
                name: `${user.firstName} ${user.lastName}`,
            };
        },
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // runs on sign-in
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
})
