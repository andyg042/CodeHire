
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"
import { compare } from "bcryptjs"

const { auth, handlers, signIn, signOut } = NextAuth({
  session: { 
      strategy: "jwt" 
  },

  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user || !user.password) return null

        const isValid = await compare(credentials.password as string, user.password)
        if (!isValid) return null

        return {
            id: user.id + "",
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            randomKey: "Hey Cool"
        }
      },
    }),
  ],

  callbacks: {
  async jwt({ token, user }) {
    console.log('JWT Callback', { token, user })
    if (user) {
      token.sub = user.id
      token.randomKey = user.randomKey
    }
    return token
  },
  async session({ session, token }) {
    console.log('Session Callback', { session, token })
    if (session.user) {
      session.user.id = token.sub as string
      session.user.randomKey = token.randomKey as string
    }
    return session
  }
},

  secret: process.env.NEXTAUTH_SECRET,
})
