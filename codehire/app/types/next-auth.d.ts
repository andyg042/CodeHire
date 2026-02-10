import { DefaultSession } from "next-auth"
import { AdapterUser } from "next-auth/adapters"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      onboardingCompleted?: boolean
      randomKey?: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    randomKey?: string
    onboardingCompleted?: boolean
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    randomKey?: string
    onboardingCompleted?: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    randomKey?: string
    onboardingCompleted?: boolean
  }
}
